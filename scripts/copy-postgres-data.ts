import { Client } from "pg";

type TableCopyConfig = {
  name: string;
  idColumn?: string;
};

const tables: TableCopyConfig[] = [
  { name: "userinfor", idColumn: "id" },
  { name: "youtube_cache", idColumn: "youtubeId" },
  { name: "play_list", idColumn: "id" },
  { name: "comment", idColumn: "id" },
  { name: "like_playlist", idColumn: "id" },
];

const sourceUrl = process.env.SOURCE_DATABASE_URL;
const targetUrl = process.env.TARGET_DATABASE_URL;

if (!sourceUrl || !targetUrl) {
  throw new Error("SOURCE_DATABASE_URL and TARGET_DATABASE_URL are required");
}

const makeClient = (connectionString: string) =>
  new Client({
    connectionString,
    ssl: connectionString.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : undefined,
  });

const quoteIdentifier = (identifier: string) => `"${identifier.replace(/"/g, '""')}"`;

const getColumns = async (client: Client, table: string) => {
  const result = await client.query(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = $1
      ORDER BY ordinal_position
    `,
    [table]
  );

  return result.rows.map((row) => row.column_name as string);
};

const resetSequence = async (client: Client, table: string, idColumn?: string) => {
  if (!idColumn || idColumn !== "id") return;

  await client.query(`
    SELECT setval(
      pg_get_serial_sequence('${table}', '${idColumn}'),
      COALESCE((SELECT MAX(${quoteIdentifier(idColumn)}) FROM ${quoteIdentifier(table)}), 1),
      true
    )
  `);
};

const copyTable = async (
  source: Client,
  target: Client,
  tableConfig: TableCopyConfig
) => {
  const columns = await getColumns(source, tableConfig.name);
  if (!columns.length) {
    console.log(`Skipping missing source table ${tableConfig.name}`);
    return;
  }

  const quotedTable = quoteIdentifier(tableConfig.name);
  const quotedColumns = columns.map(quoteIdentifier);
  const sourceRows = await source.query(
    `SELECT ${quotedColumns.join(", ")} FROM ${quotedTable}`
  );

  await target.query(`TRUNCATE TABLE ${quotedTable} RESTART IDENTITY CASCADE`);

  if (!sourceRows.rowCount) {
    console.log(`Copied 0 rows into ${tableConfig.name}`);
    return;
  }

  const placeholders = sourceRows.rows
    .map((_, rowIndex) => {
      const offset = rowIndex * columns.length;
      return `(${columns.map((__, colIndex) => `$${offset + colIndex + 1}`).join(", ")})`;
    })
    .join(", ");

  const values = sourceRows.rows.flatMap((row) =>
    columns.map((column) => row[column])
  );

  await target.query(
    `
      INSERT INTO ${quotedTable} (${quotedColumns.join(", ")})
      VALUES ${placeholders}
    `,
    values
  );

  await resetSequence(target, tableConfig.name, tableConfig.idColumn);
  console.log(`Copied ${sourceRows.rowCount} rows into ${tableConfig.name}`);
};

const main = async () => {
  const source = makeClient(sourceUrl);
  const target = makeClient(targetUrl);

  await source.connect();
  await target.connect();

  try {
    for (const table of tables) {
      await copyTable(source, target, table);
    }
  } finally {
    await source.end();
    await target.end();
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
