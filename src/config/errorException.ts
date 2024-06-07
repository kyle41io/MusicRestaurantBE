import express, { Request, Response, Application } from "express";

const errorHandler= express.Router({mergeParams: true});

errorHandler.use((req : Request, res : Response, next) => {
    // exception handler for all
    try {
        next()
    } catch(err : any){
        console.error(err.stack);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  });
export default errorHandler;
