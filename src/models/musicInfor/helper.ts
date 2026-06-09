import * as yt from "youtube-search-without-api-key";
import axios from "axios";
import { MUSIC_PAGE } from "@/config/helper/constant";
import { regex5minLess } from "@/validations/regex.validate";
import { checkDuration } from "@/validations/youtube.validate";
import { downloadMusic } from "./download";

const parseYouTubeDuration = (duration: string) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
};

const formatDuration = (secondsTotal: number) => {
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = (secondsTotal % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const musicSearchWithYouTubeApi = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  const maxResults = Math.min(MUSIC_PAGE * page + MUSIC_PAGE, 25);
  const searchResponse = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        maxResults,
        q: search,
        type: "video",
        videoCategoryId: "10",
        key: apiKey,
      },
    }
  );

  const ids = (searchResponse.data.items || [])
    .map((item: any) => item.id?.videoId)
    .filter(Boolean);

  if (!ids.length) return { data: { data: [], page, rowCount: 0 }, success: true };

  const videoResponse = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "snippet,contentDetails",
        id: ids.join(","),
        key: apiKey,
      },
    }
  );

  const videos = (videoResponse.data.items || [])
    .map((item: any) => {
      const durationSeconds = parseYouTubeDuration(item.contentDetails.duration);
      const thumbnail =
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url ||
        "";

      return {
        id: item.id,
        videoId: item.id,
        title: item.snippet.title,
        thumbnail,
        duration: formatDuration(durationSeconds),
        duration_raw: formatDuration(durationSeconds),
        snippet: {
          ...item.snippet,
          thumbnails: {
            ...item.snippet.thumbnails,
            url: thumbnail,
          },
        },
      };
    })
    .filter((item: any) => {
      const durationSeconds = parseYouTubeDuration(
        videoResponse.data.items.find((video: any) => video.id === item.id)
          ?.contentDetails.duration || ""
      );
      return durationSeconds > 0 && durationSeconds <= 300;
    });

  const start = MUSIC_PAGE * page - MUSIC_PAGE;
  const data = videos.slice(start, start + MUSIC_PAGE);
  return { data: { data, page, rowCount: videos.length }, success: true };
};

/**
 * Given a search query, searching on youtube
 * @param {string} search value (string or videoId).
 */
export const musicSearch = async ({search, page}: {search: string, page: number}) => {
  if (!search) return { success: false, message: "Bad Request" };
  const apiResult = await musicSearchWithYouTubeApi({ search, page });
  if (apiResult) return apiResult;

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
