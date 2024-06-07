import { hashPassword } from "@/config/helper/hashPassword";
import { readUserHelper } from "./helper";
export const authSignIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const passwordSecure = hashPassword(password)
    const result = await readUserHelper({ username, password: passwordSecure });
    return result;
  };
