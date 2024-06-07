import { Comment } from "@/config/database/typeorm/comment";
import { commentlistRepository } from "@/config/database/typeorm";
import { COMMENT_LIMIT } from "@/config/helper/constant";

export const makeCommentHelper = async ({
  userId,
  content,
  playlistId,
}: {
  userId: number;
  content: string;
  playlistId: number;
}) => {
  const newComment = new Comment();
  newComment.content = content;
  newComment.userId = userId;
  newComment.playlistId = playlistId;
  await commentlistRepository.save(newComment);
  return newComment;
};
export const readCommentFromUserAndPlaylist_TimeSortHelper = async ({
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
  let limit = COMMENT_LIMIT.TIME;
  if (!userId && playlistId) {
    const dataPromise = commentlistRepository.find({
      where: { playlistId },
      order: { createdAt: sort },
      skip: page * limit - limit,
    });
    const countPromise = commentlistRepository.count({
      where: { playlistId },
    });
    const [data, rowCount] = await Promise.all([dataPromise, countPromise]);
    return { data, rowCount, page };
  }

  if (userId && !playlistId) {
    const dataPromise = commentlistRepository.find({
      where: { userId },
      order: { createdAt: sort },
      skip: page * limit - limit,
    });
    const countPromise = commentlistRepository.count({
      where: { userId },
    });
    const [data, rowCount] = await Promise.all([dataPromise, countPromise]);
    return { data, rowCount, page };
  }

  if (!userId && !playlistId) {
    const dataPromise = commentlistRepository.find({
      order: { createdAt: sort },
      skip: page * limit - limit,
    });
    const countPromise = commentlistRepository.count();
    const [data, rowCount] = await Promise.all([dataPromise, countPromise]);
    return { data, rowCount, page };
  }

  const dataPromise = commentlistRepository.find({
    where: { userId, playlistId },
    order: { createdAt: sort },
    skip: page * limit - limit,
  });
  const countPromise = commentlistRepository.count({
    where: { userId, playlistId },
  });
  const [data, rowCount] = await Promise.all([dataPromise, countPromise]);

  return { data, rowCount, page };
};

export const readCommentFromPlaylist_UserSortHelper = async ({
  playlistId,
  sort,
  page,
}: {
  playlistId: number;
  sort: "DESC" | "ASC";
  page: number;
}) => {
  let limit = COMMENT_LIMIT.USER;

  if (!playlistId) {
    const dataPromise = commentlistRepository.find({
      order: { userId: sort },
      skip: page * limit - limit,
    });
    const countPromise = commentlistRepository.count();
    const [data, rowCount] = await Promise.all([dataPromise, countPromise]);
    return { data, rowCount, page };
  }

  const dataPromise = commentlistRepository.find({
    where: { playlistId },
    order: { userId: sort },
    skip: page * limit - limit,
  });
  const countPromise = commentlistRepository.count({
    where: { playlistId },
  });
  const [data, rowCount] = await Promise.all([dataPromise, countPromise]);

  return { data, rowCount, page };
};

export const readCommentFromUser_PlaylistSortHelper = async ({
  userId,
  sort,
  page,
}: {
  userId: number;
  sort: "DESC" | "ASC";
  page: number;
}) => {
  let limit = COMMENT_LIMIT.PLAYLIST;

  if (userId) {
    const dataPromise = commentlistRepository.find({
      where: { userId },
      order: { playlistId: sort },
      skip: page * limit - limit,
    });
    const countPromise = commentlistRepository.count({
      where: { userId },
    });

    const [data, rowCount] = await Promise.all([dataPromise, countPromise]);
    return { data, rowCount, page };
  }

  const dataPromise = commentlistRepository.find({
    order: { playlistId: sort },
    skip: page * limit - limit,
  });
  const countPromise = commentlistRepository.count();
  const [data, rowCount] = await Promise.all([dataPromise, countPromise]);

  // const dataPromise = commentlistRepository.find({ // work
  //   order: { createdAt: sort },
  //   skip: page * limit - limit,
  // });
  // const countPromise = commentlistRepository.count();
  // const [data, rowCount] = await Promise.all([dataPromise, countPromise]);

  return { data, rowCount, page };
};
// put and delete

export const deleteCommentHelper = async ({
  userId,
  id,
}: {
  userId: number;
  id: number;
}) => {
  try {
    const result = await commentlistRepository.delete({ id, userId });
    return { success: true, message: "Successfully delete playlist" };
  } catch (err) {
    if (err) console.log(err);
    return { success: false, message: "UnAuthorize" };
  }
};

export const updateCommentHelper = async({
  userId,
  id,
  content,
  playlistId,
}: {
  userId: number;
  id: number;
  content: string;
  playlistId: number
})=>{
  // const result = await commentlistRepository.delete({ id, userId });
  // return { success: true, message: "Successfully delete playlist" };
  const updateComment = await commentlistRepository.findOne({where: {id, userId,playlistId}})
  if(!updateComment) return { success: false, message: "Not authorize to update this comment" };
  updateComment.content = content;
  await commentlistRepository.save(updateComment)
  return { success: true, message: "Successfully edit the comment" }

}