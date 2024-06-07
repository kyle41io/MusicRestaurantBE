import { userRepository } from "@/config/database/typeorm";
import { Userinfor } from "@/config/database/typeorm/user";

export const readUserIdHelper = async (id: number)=>{
  const user = await userRepository.findOne({where: {id}}) 
  return user;
}

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
  if (!signinUser) return { success: false, message: "Wrong email/password" };
  return { success: true, data: signinUser };
};

export const addUserHelper = async ({
  username,
  password,
  name,
  avatar
}: {
  username: string;
  password: string;
  name: string;
  avatar: string;
}) => {
  
  try {const newUser = new Userinfor();
  newUser.username = username;
  newUser.password = password;
  newUser.name = name;
  newUser.avatar = avatar;
  await userRepository.save(newUser);
  return { success: true, data: newUser };}
  catch (err){
    console.log(err)
    return { success: false, data: null }
  }
};

export const checkUsernameExist = async (username: string) => {
  const userExist = await userRepository.findOne({ where: { username } });
  return userExist && true;
};

export const editUserHelper = async ({
  username,
  password,
  name,
  id,
  avatar
}: {
  username: string;
  password: string;
  name: string;
  id: number;
  avatar: string;
}) => {
  const updateUser = await userRepository.findOne({ where: { username, id } });
  if (!updateUser) return { success: false, message: "Bad Request" };
  updateUser.password = password;
  updateUser.name = name;
  updateUser.avatar = avatar;
  await userRepository.save(updateUser);
  if (!updateUser) return { success: false, message: "Bad Request" };
  return { success: true, data: updateUser };
};

export const deleteUserHelper = async (id: number) => {
  try {
    const result = await userRepository.delete({ id });
    return { success: true, message: "Successfully delete" };
  } catch(err) {
    if(err)console.log(err)
    return { success: false, message: "UnAuthorize" };
  }
};
