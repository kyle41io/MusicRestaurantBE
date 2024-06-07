import * as yt from "youtube-search-without-api-key";
import { MUSIC_PAGE } from "@/config/helper/constant";
import { regex5minLess } from "@/validations/regex.validate";
import { checkDuration } from "@/validations/youtube.validate";
import { downloadMusic } from "./download";

/**
 * Given a search query, searching on youtube
 * @param {string} search value (string or videoId).
 */
export const musicSearch = async ({search, page}: {search: string, page: number}) => {
  if (!search) return { success: false, message: "Bad Request" };
  const videos = await yt.search(search);
  const videoFilter = videos.filter((el) =>
    regex5minLess.test(el.duration_raw)
  );
  const pageArr = []
  for(let i = MUSIC_PAGE*page;i<MUSIC_PAGE*page + MUSIC_PAGE;i++) {
    if(videoFilter[i]) pageArr.push(videoFilter[i])
  }
  if (pageArr.length) return { data: {data: pageArr, page, rowCount: videoFilter.length}, success: true,  };
  else return { success: false, message: "No song left",page, rowCount: videoFilter.length};
};

export const musicFromYoutubeId =async (youtubeId:string) => {
  const videos = await yt.search(youtubeId);
  return videos[0]
  // let the youtube validate handle bad request
}

export const downloadMusicCheck = async (id: string) => {
  const check = await checkDuration(id);
  if (!check)
    return {
      success: false,
      message: "Duration must be less than 5 minutes",
      data: null,
    };
  else return downloadMusic(id);
};
