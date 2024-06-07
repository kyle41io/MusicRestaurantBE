import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const checkPath = path.join(__dirname, `../../../data`);
if(!fs.existsSync(checkPath)) fs.mkdirSync(checkPath)
export const allMusicId = () => {
  const file = path.join(__dirname, `../../../data`);
  const fileList = fs.readdirSync(file);
  return fileList;
};

export const idToMusic = (id: String) => {
  try {
    const file = path.join(__dirname, `../../../data/${id}`);
    const fileList = fs.readdirSync(file);
    return {songPath: path.join(file, fileList[0]), success: true};
  } catch {
    return {message:"Download the song first", success: false, songPath:''}
    // error check to prevent ts bug
  }
};


export const dataFolder = path.join(__dirname, "../../../data");
