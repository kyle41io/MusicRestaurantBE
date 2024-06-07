import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import { idToMusic, dataFolder, allMusicId } from "@/config/helper/musicFolder";
import { optionsDownload } from "@/config/helper/constant";
import { musicFromYoutubeId } from "./helper";
import NodeID3 from "node-id3";
import { ytCacheRepository } from "@/config/database/typeorm";
import { youtubePicFromId } from "@/config/helper/constant";

dotenv.config();

const serVerFetch = async (id: string) => {
  try {
    const response = await axios.request(optionsDownload(id));
    const a = response.data;
    return {
      success: true,
      link: response.data.link,
      title: response.data.title,
      duration: response.data.duration,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      link: "",
      title: "",
      duration: "1:00",
    };
  }
};

export const downloadMusic = async (id: string) => {
  const folderSave = `${dataFolder}/${id}`;
  const dataReturn = await ytCacheRepository.findOne({
    where: { youtubeId: id },
  });
  // file and cache

  if (fs.existsSync(folderSave)) {
    // file exist => cache have infors
    const fileList = fs.readdirSync(folderSave);
    if (fileList.length) {
      return { success: true, data: dataReturn };
    }
  }
  fs.mkdirSync(folderSave); // make folder and save file to

  const infor = await serVerFetch(id); // if there is no file => cache only have id => start download
  if (infor.success && infor.link) {
    const response = await axios.get(infor.link, {
      responseType: "arraybuffer",
    });

    const fileBuffer = Buffer.from(response.data); // buffer to read
    const fileBufferSave = new Uint8Array(response.data); // buffer save
    fs.writeFile(
      `${folderSave}/${infor.title.replaceAll("/", "_")}.mp3`,
      fileBufferSave,
      (err: any) => {
        if (err) {
          console.log(err);
          return { success: false, data: "", message: JSON.stringify(err) };
        }
        NodeID3.read(fileBuffer, async (err: any, tags: any) => {
          if (err) {
            console.log(err);
            return { success: false, data: "", message: JSON.stringify(err) };
          }
          if (!dataReturn) return { success: false, data: "", message: "" }; // the validate already cache, always have a youtubeid
          if (dataReturn.genre) return { success: true, data: dataReturn };
          // save infor from buffer header to database
          dataReturn.title = tags.title ? tags.title : "";
          dataReturn.duration = tags.duration ? tags.duration : "";
          dataReturn.artist = tags.artist ? tags.artist : "";
          dataReturn.description = tags.description ? tags.description : "";
          dataReturn.year = parseInt(tags.year) ? parseInt(tags.year) : 0;
          dataReturn.genre = tags.genre ? tags.genre : "None";
          dataReturn.image = youtubePicFromId(id);
          await ytCacheRepository.save(dataReturn);
          return { success: true, data: dataReturn };
        });
      }
    );
    // const a = dataReturn
    // return { success: true,data: dataReturn };
  } else
    return {
      success: false,
      message: "No video",
      data: "",
    };
};
