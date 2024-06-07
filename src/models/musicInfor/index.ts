import { musicSearch } from "./helper";
import { downloadMusicCheck } from "./helper";
export const musicYoutubeSearch = async ({page,search}: {page: number,search: string}) => {
  const data = await musicSearch({search,page});
  return data;
};

export const downloadSong = async(youtubeId : string)=> {
  const data = await downloadMusicCheck(youtubeId)
  return data
}