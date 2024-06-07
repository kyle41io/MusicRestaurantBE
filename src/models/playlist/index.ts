import {
  addNewPlaylistHelper,
  deletePlaylistIdHelper,
  readPlaylistByIdHelper,
  readPlaylistTimeSortHelper,
  readPlaylistTimeTopSortHelper,
  readPlaylistUserSortHelper,
  readPlaylistUserTopSortHelper,
  updatePlaylistIdHelper,
  readOnePlaylistIdhelper
} from "./helper";
export const playListMaking = async ({
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
  const data = await addNewPlaylistHelper({
    playlistName,
    songList,
    image,
    userId,
  });
  if (data) return { success: true, data };
  return { success: false, message: "Fail to add new playlist" };
};

export const readPlaylistById = async (id: number) => {
  const playlist = await readPlaylistByIdHelper(id);
  if (playlist) return { success: true, data: playlist };
  return { success: false, message: "No playlist with this Id" };
};

export const readAllPlaylistTimeSortFromUser = async ({
  userId,
  sort,
  page,
}: {
  userId: number;
  sort: "DESC" | "ASC";
  page: number;
}) => {
  const playlist = await readPlaylistTimeSortHelper({ userId, sort, page });
  if (playlist.rowCount) return { success: true, data: playlist };
  return { success: false, message: "This user don't have any/more playlist" };
};

export const readAllPlaylistTimeTop = async ({
  sort,
  page,
}: {
  sort: "DESC" | "ASC";
  page: number;
}) => {
  const playlist = await readPlaylistTimeTopSortHelper({ sort, page });
  if (playlist.rowCount) return { success: true, data: playlist };
  return { success: false, message: "This user don't have any/more playlist" };
};

export const readOnePlaylistId = async (id: number) => {
  const playlist = await readOnePlaylistIdhelper(id)
  if(playlist && true) return {success: true , data: playlist}
  else return {success: false,message: "No playlist"}
}

// done read

export const deletePlaylistId =async ({userId,id}: {userId: number,id: number}) => {
  const result = await deletePlaylistIdHelper({userId,id})
  return result
}

export const updatePlaylistId =async ({
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
  userId: number;}) => {
  const result = await updatePlaylistIdHelper({id,
    playlistName,
    songList,
    image,
    userId,})
  return result
}
