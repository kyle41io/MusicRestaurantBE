import Joi from "joi";
import { regexPassword, regexUrlImage, regexUsername } from "./regex.validate";
import { USERNAME_VALIDATE, COMMENT_VALIDATE } from "@/config/helper/constant";

export const schemaBodys = {
  usernameAndPassword: Joi.object().keys({
    username: Joi.string()
      .max(USERNAME_VALIDATE.max)
      .min(USERNAME_VALIDATE.min)
      .required(), // okay
    password: Joi.string().regex(regexPassword), // okay
  }),
  nameAndPassword: Joi.object().keys({
    name: Joi.string().required(), // okay
    password: Joi.string().regex(regexPassword), // okay
  }),
  idCheck: Joi.object().keys({
    id: Joi.number().required(), //  need aditional check if the id is youtubeId
  }),
  namecheck: Joi.object().keys({
    name: Joi.string().required(), // okay
  }),
  usernameCheck: Joi.object().keys({
    username: Joi.string().regex(regexUsername),
  }),
  songIdCheck: Joi.object().keys({
    songId: Joi.string().required(), //  need aditional check if the id is youtubeId
  }),
  songListCheck: Joi.object().keys({
    songList: Joi.array().items(Joi.string()).required(), //  need aditional check all the id is youtubeId
  }),
  contentCheck: Joi.object().keys({
    content: Joi.string()
      .max(COMMENT_VALIDATE.max)
      .min(COMMENT_VALIDATE.min)
      .required(), //  need aditional check if the id is youtubeId
  }),
  imageCheck: Joi.object().keys({
    image: Joi.string().required(), //  need aditional check if the id is youtubeId
    // image: Joi.string().required().regex(regexUrlImage), //  need aditional check if the id is youtubeId
  }),
  playlistNameCheck: Joi.object().keys({
    playlistName: Joi.string().min(1).required(), //  need aditional check if the id is youtubeId
  }),
  playlistIdCheck: Joi.object().keys({
    playlistId: Joi.number().required(), //  need aditional check if the id is youtubeId
  }),
};

export const schemaQuerys = {
  pageCheck: Joi.object().keys({
    page: Joi.number().required(), // okay
  }),
  searchCheck: Joi.object().keys({
    search: Joi.string().required(), //  need aditional check if the id is youtubeId
  }),
  usernameCheck: Joi.object().keys({
    username: Joi.string().required().max(32).min(5),
  }),
  userIdCheck: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  sortCheck: Joi.object().keys({
    sort: Joi.string().required().valid("ASC", "DESC"), //  need aditional check if the id is youtubeId
  }),
};

export const schemaParams = {
  userIdCheck: Joi.object().keys({
    userId: Joi.number().required(), //  need aditional check if the id is youtubeId
  }),
  // playlistCheck: Joi.object().keys({
  //   playlistId: Joi.number().required(), //  need aditional check if the id is youtubeId
  // }),
  playlistIdCheck: Joi.object().keys({
    playlistId: Joi.number().required(), //  need aditional check if the id is youtubeId
  }),
  idCheck: Joi.object().keys({
    id: Joi.number().required(), //  need aditional check if the id is youtubeId
  }),
};
