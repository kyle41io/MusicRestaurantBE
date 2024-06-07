import dotenv from "dotenv";
dotenv.config();

export const MUSIC_PAGE = 5;
export const USERNAME_VALIDATE = {
    min: 5,
    max: 32
}
export const COMMENT_VALIDATE = {
    max: 250,
    min:1
}
export const PLAYLISTNAME_VALIDATE = {
    max: 32,
    min:1
}
export const PLAYLIST_LIMIT = {
  TIME: 10,
  VIEW: 6,
  USER: 10
}

export const COMMENT_LIMIT = {
  TIME: 10,
  PLAYLIST: 10,
  USER: 10
}

const downloadKey = process.env.DOWNLOAD_MUSIC;
export const optionsDownload = (id: string) => {
    return {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id },
      headers: {
        "X-RapidAPI-Key": downloadKey,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };
  };

export const youtubePicFromId = (id: string)=> `https://i.ytimg.com/vi/${id}/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAmWNobaFgWajWevnGzK5p1zY8KdQ`