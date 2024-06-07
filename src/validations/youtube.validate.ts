import { rejects } from "assert";
import { regex5minLess } from "./regex.validate";
import * as yt from "youtube-search-without-api-key";
import { resolve } from "path";
import { ytCacheRepository } from "@/config/database/typeorm";
import NodeID3 from "node-id3";
import axios from "axios";


export const checkDuration = async (id: string) => {
  const videosIdArr = await yt.search(id);
  if (!regex5minLess.test(videosIdArr[0].duration_raw)) return false;
  return true;
};

export const validateYoutubeId = (id: string) => {

  return new Promise(async (resolve: any, rejects: any) => {

    const cacheCheck = await ytCacheRepository.findOne({
      where: { youtubeId: id },
    });
    if (cacheCheck) {
      return resolve(true);
    } else {
      const videosIdArr = await yt.search(id);
      if (videosIdArr[0].id.videoId === id) {
        await ytCacheRepository.save({ youtubeId: id });
        return resolve(true);
      }
      return rejects(false);
    }
  });
};

export const validateYoutubeSongList = (songList: string[]) => {
  const checkYoutubeList = songList.map((id) => validateYoutubeId(id));
  return Promise.allSettled(checkYoutubeList);
};
