import { dataSource } from "@/config/database/typeorm";

let connectionPromise: Promise<typeof dataSource> | null = null;

const migratePlaylistSongListColumn = async () => {
  const columns = await dataSource.query(`
    SELECT udt_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'play_list'
      AND column_name = 'songList'
  `);

  if (!columns.length) return;

  if (columns[0].udt_name !== "_text") {
    await dataSource.query(`
      ALTER TABLE "play_list"
      ALTER COLUMN "songList" TYPE text[] USING "songList"::text[],
      ALTER COLUMN "songList" SET DEFAULT '{}',
      ALTER COLUMN "songList" SET NOT NULL
    `);
    return;
  }

  await dataSource.query(`
    ALTER TABLE "play_list"
    ALTER COLUMN "songList" SET DEFAULT '{}',
    ALTER COLUMN "songList" SET NOT NULL
  `);
};

export const createTableConnect = () => {
  if (dataSource.isInitialized) return Promise.resolve(dataSource);
  if (connectionPromise) return connectionPromise;

  connectionPromise = dataSource
    .initialize()
    .then(async () => {
      await migratePlaylistSongListColumn();
      await dataSource.synchronize();
      console.log("Connected -duh");
      return dataSource;
    })
    .catch(function (error) {
      connectionPromise = null;
      console.log("Error: ", error);
      throw error;
    });

  return connectionPromise;
};
