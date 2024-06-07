import {
  makeNewLikeHelper,
  removeLikeHelper,
  readUserLikeFromPlaylistHelper,
  readPlaylistLikeFromUserHelper,
} from "./helper";

export const makeNewLike = async ({
  userId,
  playlistId,
}: {
  userId: number;
  playlistId: number;
}) => {
  const result = await makeNewLikeHelper({ userId, playlistId });
  if (result) return { success: true, data: result };
  return { success: false, data: null, message: "Something wrong" };
};

export const readUserLikePlaylist = async ({
  userId,
  page,
  sort,
}: {
  page: number;
  sort: "DESC" | "ASC";
  userId: number;
}) => {
  const result = await readUserLikeFromPlaylistHelper({
    userId,
    page,
    sort,
  });
  if (result.data.length) {
    result.data.forEach((el) => {
      if (el && el.password) delete el.password;
    });
    return {
      success: true,
      data: result.data,
      page: result.page,
    };
  }
  return { success: false, data: null, message: "No one like yet" };
};

export const readPlaylistFromUserLike = async ({
  playlistId,
  page,
  sort,
}: {
  page: number;
  sort: "DESC" | "ASC";
  playlistId: number;
}) => {
  const result = await readPlaylistLikeFromUserHelper({
    playlistId,
    page,
    sort,
  });
  if (result.data.length) {
    return {
      success: true,
      data: { rowCount: result.rowCount, data: result.data, page: result.page },
    };
  }
  return { success: false, data: null, message: "No one like yet" };
};

export const removeLike = async ({
  userId,
  id,
}: {
  userId: number;
  id: number;
}) => {
  const result = await removeLikeHelper({ userId, id });
  if (result.affected) return { success: true, data: result };
  return { success: false, data: null, message: "Not authorized no Unlike" };
};
