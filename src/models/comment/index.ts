import {
  readCommentFromUserAndPlaylist_TimeSortHelper,
  readCommentFromPlaylist_UserSortHelper,
  readCommentFromUser_PlaylistSortHelper,
  makeCommentHelper,
  deleteCommentHelper,
  updateCommentHelper,
} from "./helper";
export const readCommentFromUserAndPlaylist_TimeSort = async ({
  userId,
  playlistId,
  sort,
  page,
}: {
  userId: number;
  playlistId: number;
  sort: "DESC" | "ASC";
  page: number;
}) => {
  const result = await readCommentFromUserAndPlaylist_TimeSortHelper({
    userId,
    playlistId,
    sort,
    page,
  });
  if (result.data.length)
    return { success: true, data: result, message: "No comment found" };
  return {
    success: true,
    data: { page, data: result, rowCount: result.rowCount },
  };
};

export const readCommentFromPlaylist_UserSort = async ({
  playlistId,
  sort,
  page,
}: {
  playlistId: number;
  sort: "DESC" | "ASC";
  page: number;
}) => {
  const result = await readCommentFromPlaylist_UserSortHelper({
    playlistId,
    sort,
    page,
  });
  if (result.data.length)
    return { success: true, data: result, message: "No comment found" };

  return { success: false, data: null, message: "No comment found" };
};

export const readCommentFromUser_PlaylistSort = async ({
  userId,
  sort,
  page,
}: {
  userId: number;
  sort: "DESC" | "ASC";
  page: number;
}) => {
  const result = await readCommentFromUser_PlaylistSortHelper({
    userId,
    sort,
    page,
  });
  if (result.data.length)
    return { success: true, data: result, message: "No comment found" };
  return {
    success: true,
    data: { page, data: result, rowCount: result.rowCount },
  };
};

// read done

export const makeComment = async ({
  userId,
  playlistId,
  content,
}: {
  userId: number;
  playlistId: number;
  content: string;
}) => {
  try {
    const data = await makeCommentHelper({ userId, content, playlistId });
    return { success: true, data, message: "" };
  } catch {
    return { success: false, data: null, message: "No comment found" };
  }
};

export const EditComment = async ({
  userId,
  playlistId,
  id,
  content,
}: {
  userId: number;
  playlistId: number;
  id: number;
  content: string;
}) => {
  return { success: false, data: null, message: "No comment found" };
};

export const deleteComment = async ({
  userId,
  id,
}: {
  userId: number;
  id: number;
}) => {
  const result = await deleteCommentHelper({ userId, id });
  return result;
  // if(result.success) return { success: false, data: null, message: "No comment found" };
};
export const UpdateComment = async ({
  userId,
  id,
  content,
  playlistId,
}: {
  userId: number;
  id: number;
  content: string;
  playlistId: number;
}) => {
  const result = await updateCommentHelper({
    userId,
    id,
    content,
    playlistId,
  });
  return result;
};
