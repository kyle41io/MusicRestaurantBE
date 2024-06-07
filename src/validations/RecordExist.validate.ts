import { readOnePlaylistId } from "@/models/playlist";
import { checkUsernameExist } from "@/models/user/helper";
import { likeListRepository } from "@/config/database/typeorm";

export const usernameExist = async (username: string) => {
  const check = await checkUsernameExist(username);
  return check && true;
};

export const playlistExist = async (id: number) => {
  const check = await readOnePlaylistId(id);
  return check && true;
};

export const likeExist = async ({
  userId,
  playlistId,
}: {
  userId: number;
  playlistId: number;
}) => {
  const check = await likeListRepository.findOne({
    where: { userId, playlistId },
  });
  return check && true;
};
