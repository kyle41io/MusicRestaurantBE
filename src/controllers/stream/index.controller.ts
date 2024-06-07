import express, { Request, Response, Application } from "express";
import { streamMusic } from "@/models/stream/helper";

export const streamController= express.Router({mergeParams: true});
export const streamControllerpost= express.Router({mergeParams: true});
streamController.use(async(req: Request, res: Response )=>{
    const songId = req.params.songId as string
    const result = await streamMusic(songId)
    if (result.success) return res.status(200).send(result.data);
    else return res.status(400).send({message: result.message});
})
streamControllerpost.use(async(req: Request, res: Response )=>{
    res.send('hello')
})
