import express, { Request, Response, Application } from "express";
import configApp from "./config";
import expressRoute from "./routes/index.route";
import { createTableConnect } from "@/config/helper/startup";
import { checkPath, idToMusic, allMusicId } from "./config/helper/musicFolder";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(configApp);
app.use(expressRoute);

app.listen(PORT, async () => {
  console.log(`PORT ${PORT} is listening`);
  // createTableConnect()
});
