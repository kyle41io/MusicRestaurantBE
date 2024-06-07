import * as fs from "fs/promises";
import { idToMusic } from "@/config/helper/musicFolder";
export const streamMusic = async (id: string) => {
  const pathItem = idToMusic(id);
  if (pathItem.success) {
    const data = await fs.readFile(pathItem.songPath);
    return {data, success: true};
  } return {success: false, message: pathItem.message }
};
