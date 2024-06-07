import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const secretKey = `${process.env.PASSWORD_KEY}`;

export const encryptAuth = (token?: string) => {
  if (!token) return { message: "Require authentication from user", success: false };
  let result = { message: "Un-authorized request", success: false };
  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    const newDecode = decoded as { userId: number; iat: number };
    if (err) return { message: "Un-authorized request", success: false };
    if (newDecode.iat < new Date().getTime())
      return { message: "You need to sign in again", success: false };

    if (newDecode.userId) result = { message: "", success: true };
  });
  return result;
};

// export const checkAllowUpdateAuth = ({
//   token,
//   userIdRequest,
// }: {
//   token?: string;
//   userIdRequest?: string;
// }) => {
//   if (!token) return { message: "You are not allow to Update", success: false };
//   let result = { message: "You are not allow to Update", success: false };

//   jwt.verify(token, secretKey, (err: any, decoded: any) => {
//     const newDecode = decoded as { userId: number; iat: number };
//     const userId = `${newDecode.userId}`;

//     if (userId === userIdRequest) result = { message: "", success: true };
//   });
//   return result;
// };

export const userIdFromAuth = (token?: string) => {
  if (!token) return { userId: -1, iat: 1700381283777 };
  const infor = jwt.decode(token)
    ? jwt.decode(token)
    : { userId: -1, iat: 1700381283777 };
  return infor;
};
