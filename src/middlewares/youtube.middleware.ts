import { Request, Response } from "express";
import {
  validateYoutubeId,
  validateYoutubeSongList,
} from "@/validations/youtube.validate";

export const checkYoutubeId = async (
  req: Request,
  res: Response,
  next: any
) => {
  const songId = req.params.songId;
  if (!songId || typeof songId !== "string") return res.send("No songId query");
  validateYoutubeId(songId)
    .then((data) => {
      if (data) next();
    })
    .catch(() => res.status(400).send({ message: "No song with this ID" }));
};

export const checkYoutubeIdList = async (
  req: Request,
  res: Response,
  next: any
) => {
  const songList: string[] = req.body.songList;
  const checkEachId = await validateYoutubeSongList(songList);
  const arrResult: { songId: string; valid: boolean | unknown }[] = [];
  for (let i = 0; i < checkEachId.length; i++) {
    const checkLink = checkEachId[i] as { value: boolean };
    const checkObj = { songId: songList[i], valid: checkLink.value };
    arrResult.push(checkObj);
  }
  const badArr = arrResult.filter((el) => !el.valid);
  if (!badArr.length) return next();
  return res.status(400).send(badArr);
};
