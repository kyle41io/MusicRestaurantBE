import express, { Request, Response, Application } from "express";

const errorHandler= express.Router({mergeParams: true});

errorHandler.use((err : any, req : Request, res : Response, next: any) => {
  console.error(err?.stack || err);
  return res.status(500).json({ error: "Internal Server Error" });
});
export default errorHandler;
