import { streamMusic } from "./helper";
export const streamFile = async (id: string) => {
  const file = await streamMusic(id);
  return file;
};
