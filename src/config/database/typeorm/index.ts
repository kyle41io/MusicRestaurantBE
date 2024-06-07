import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import { Userinfor } from "./user";
import { PlayList } from "./playlist";
import { Comment } from "./comment";
import { LikePlaylist } from "./likePlaylist";
import { YoutubeCache } from "./youtubeId";
const isLocalhost = process.env.ENVIROMENT === "DEV";

export const dataSource = new DataSource({
  type: "postgres",
  port:
    process.env.POSTGRES_PORT && parseInt(process.env.POSTGRES_PORT)
      ? parseInt(process.env.POSTGRES_PORT)
      : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  host: isLocalhost ? process.env.POSTGRES_LOCAL : process.env.POSTGRES_HOST, // for docker-compose up db, to just run the database
  entities: [Userinfor, PlayList, Comment, LikePlaylist, YoutubeCache],
});
export const userRepository = dataSource.getRepository("Userinfor");
export const playlistRepository = dataSource.getRepository("play_list");
export const commentlistRepository = dataSource.getRepository("comment");
export const likeListRepository = dataSource.getRepository("like");
export const ytCacheRepository = dataSource.getRepository("youtube_cache");
