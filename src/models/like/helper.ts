import {
  likeListRepository,
  userRepository,
  playlistRepository,
} from "@/config/database/typeorm";
import { LikePlaylist } from "@/config/database/typeorm/likePlaylist";
import { COMMENT_LIMIT } from "@/config/helper/constant";
export const makeNewLikeHelper = async ({
  userId,
  playlistId,
}: {
  userId: number;
  playlistId: number;
}) => {
  const newLike = new LikePlaylist();
  newLike.playlistId = playlistId;
  newLike.userId = userId;
  await likeListRepository.save(newLike);
  return newLike;
};
export const readPlaylistLikeFromUserHelper = async ({
  playlistId,
  page,
  sort,
}: {
  page: number;
  sort: "DESC" | "ASC";
  playlistId: number;
}) => {
  let limit = COMMENT_LIMIT.PLAYLIST;

  const PlaylistIdListPromise = likeListRepository.find({
    where: { playlistId },
    order: { playlistId: sort },
    skip: page * limit - limit,
  });
  const countPromise = likeListRepository.count({
    where: { playlistId },
  });

  // userId list(from like) for user to query
  const [arrPlaylistId, rowCount] = await Promise.all([
    PlaylistIdListPromise,
    countPromise,
  ]);
  // query all playlistId=>id in playlist
  const PlaylistArr = await Promise.all(
    arrPlaylistId.map((playlistIdObj) =>
      playlistRepository.findOne({
        where: { id: playlistIdObj.playlistId },
      })
    )
  );
  return { data: PlaylistArr, rowCount, page };
};

export const readUserLikeFromPlaylistHelper = async ({
  userId,
  page,
  sort,
}: {
  page: number;
  sort: "DESC" | "ASC";
  userId: number;
}) => {
  let limit = COMMENT_LIMIT.PLAYLIST;

  const arrUserIdPromise = likeListRepository.find({
    where: { userId },
    order: { userId: sort },
    skip: page * limit - limit,
  });
  const countPromise = likeListRepository.count({
    where: { userId },
  });

  // playlistId list(from like) for playlist to query
  const [userIdList, rowCount] = await Promise.all([
    arrUserIdPromise,
    countPromise,
  ]);

  // query all userId=>id in playlist
  const UserList = await Promise.all(
    userIdList.map((userIdObj) =>
      userRepository.findOne({
        where: {
          id: userIdObj.userId,
        },
      })
    )
  );
  return { data: UserList, rowCount, page };
};

export const removeLikeHelper = async ({
  userId,
  id,
}: {
  userId: number;
  id: number;
}) => {
  const result = await likeListRepository.delete({ userId, id });
  return result;
};
