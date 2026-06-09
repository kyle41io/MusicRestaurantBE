import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import { Userinfor } from "./user";
import { PlayList } from "./playlist";
import { Comment } from "./comment";
import { LikePlaylist } from "./likePlaylist";
import { YoutubeCache } from "./youtubeId";
const isLocalhost = process.env.ENVIROMENT === "DEV";
const databaseUrl = process.env.DATABASE_URL;

export const dataSource = new DataSource({
  type: "postgres",
  ...(databaseUrl
    ? {
        url: databaseUrl,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        port:
          process.env.POSTGRES_PORT && parseInt(process.env.POSTGRES_PORT)
            ? parseInt(process.env.POSTGRES_PORT)
            : 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: isLocalhost ? process.env.POSTGRES_LOCAL : process.env.POSTGRES_HOST,
      }),
  synchronize: false,
  logging: true,
  entities: [Userinfor, PlayList, Comment, LikePlaylist, YoutubeCache],
});
export const userRepository = dataSource.getRepository("Userinfor");
export const playlistRepository = dataSource.getRepository("play_list");
export const commentlistRepository = dataSource.getRepository("comment");
export const likeListRepository = dataSource.getRepository("like_playlist");
export const ytCacheRepository = dataSource.getRepository("youtube_cache");
