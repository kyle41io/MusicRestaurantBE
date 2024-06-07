import {
  commentlistRepository,
  likeListRepository,
  playlistRepository,
} from "@/config/database/typeorm";
import { PlayList } from "@/config/database/typeorm/playlist";
import { PLAYLIST_LIMIT } from "@/config/helper/constant";
import { readOnePlaylistId } from ".";
import { deleteCommentHelper } from "../comment/helper";
export const addNewPlaylistHelper = async ({
  playlistName,
  songList,
  image,
  userId,
}: {
  playlistName: string;
  songList: string[];
  image: string;
  userId: number;
}) => {
  const newPlaylist = new PlayList();
  newPlaylist.image = image;
  newPlaylist.songList = songList;
  newPlaylist.userId = userId;
  newPlaylist.playlistName = playlistName;
  const data = await playlistRepository.save(newPlaylist);
  return data;
};

export const readPlaylistByIdHelper = async (id: number) => {
  const playlist = await playlistRepository.findOne({ where: { id } });
  return playlist;
};

export const readPlaylistTimeSortHelper = async ({
  userId,
  sort,
  page,
}: {
  userId: number;
  sort: "DESC" | "ASC";
  page: number;
}) => {
  let limit = PLAYLIST_LIMIT.TIME;

  const dataPromise = playlistRepository.find({
    where: { userId },
    order: { createdAt: sort },
    skip: page * limit - limit,
    take: limit,
  });
  const rowCountPromise = playlistRepository.count({
    where: { userId },
  });
  const [data, rowCount] = await Promise.all([dataPromise, rowCountPromise]);

  return { data, rowCount };
};
export const readPlaylistTimeTopSortHelper = async ({
  sort,
  page,
}: {
  sort: "DESC" | "ASC";
  page: number;
}) => {
  let limit = PLAYLIST_LIMIT.VIEW;
  //   const query = playlistRepository.createQueryBuilder()
  //   .where("userId = :userId",{userId})
  // .orderBy("createdAt",sort)
  const dataPromise = playlistRepository.find({
    order: { createdAt: sort },
    skip: page * limit - limit,
    take: limit,
  });
  const rowCountPromise = playlistRepository.count({});
  const [data, rowCount] = await Promise.all([dataPromise, rowCountPromise]);

  return { data, rowCount };
};

export const readPlaylistUserSortHelper = async ({
  userId,
  sort,
  page,
}: {
  userId: number;
  sort: "DESC" | "ASC";
  page: number;
}) => {
  let limit = PLAYLIST_LIMIT.USER;

  const dataPromise = playlistRepository.find({
    where: { userId },
    order: { userId: sort },
    skip: page * limit - limit,
    take: limit,
  });
  const rowCountPromise = playlistRepository.count({
    where: { userId },
  });
  const [data, rowCount] = await Promise.all([dataPromise, rowCountPromise]);

  return { data, rowCount };
};
export const readPlaylistUserTopSortHelper = async ({
  sort,
  page,
}: {
  sort: "DESC" | "ASC";
  page: number;
}) => {
  let limit = 6;

  const dataPromise = playlistRepository.find({
    relations: ["userinfor"],
    order: { userId: sort },
    skip: page * limit - limit,
    take: limit,
  });
  const rowCountPromise = playlistRepository.count({});
  const [data, rowCount] = await Promise.all([dataPromise, rowCountPromise]);

  return { data, rowCount };
};

export const readOnePlaylistIdhelper = async (id: number) => {
  const playlist = await playlistRepository.findOne({ where: { id } });
  return playlist;
};

// done reading

export const deletePlaylistIdHelper = async ({
  userId,
  id,
}: {
  userId: number;
  id: number;
}) => {
  try {
    await deleteCommentHelper({ id, userId });
    await likeListRepository.delete({ playlistId: id });
    await playlistRepository.delete({ id, userId });
    // if(resultPlaylist.affected)
    return { success: true, message: "Successfully delete playlist" };
    // else return { success: false, message: "UnAuthorize" }
  } catch (err) {
    if (err) console.log(err);
    return { success: false, message: "UnAuthorize" };
  }
};
export const updatePlaylistIdHelper = async ({
  id,
  playlistName,
  songList,
  image,
  userId,
}: {
  id: number;
  playlistName: string;
  songList: string[];
  image: string;
  userId: number;
}) => {
  const playlist = await playlistRepository.findOne({ where: { id, userId } });
  if (!playlist)
    return { success: false, message: "Cant find a playlist to update" };
  playlist.playlistName = playlistName;
  playlist.songList = songList;
  playlist.image = image;
  playlist.playlistName = playlistName;
  await playlistRepository.save(playlist);
  return { success: true, message: "Successfully update playlist" };
};
