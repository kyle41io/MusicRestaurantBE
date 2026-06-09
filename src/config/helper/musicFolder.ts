import path from "path";
import fs from "fs";
import os from "os";
import dotenv from "dotenv";
dotenv.config();

export const dataFolder = process.env.VERCEL
  ? path.join(os.tmpdir(), "music-restaurant-data")
  : path.join(__dirname, "../../../data");

if (!fs.existsSync(dataFolder)) fs.mkdirSync(dataFolder, { recursive: true });

export const allMusicId = () => {
  const fileList = fs.readdirSync(dataFolder);
  return fileList;
};

export const idToMusic = (id: String) => {
  try {
    const file = path.join(dataFolder, `${id}`);
    const fileList = fs.readdirSync(file);
    return {songPath: path.join(file, fileList[0]), success: true};
  } catch {
    return {message:"Download the song first", success: false, songPath:''}
    // error check to prevent ts bug
  }
};
