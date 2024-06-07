import { userRepository } from "@/config/database/typeorm";
import { Userinfor } from "@/config/database/typeorm/user";

export const readUserHelper = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const signinUser = await userRepository.findOne({
    where: { username, password },
  });
  if (!signinUser)
    return { success: false, message: "Wrong email/password", data: null };
  return { success: true, data: signinUser };
};
