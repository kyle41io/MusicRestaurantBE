import "./register-alias";
import express, { Request, Response, Application } from "express";
import configApp from "./config/index";
import expressRoute from "./routes/index.route";
import { createTableConnect } from "@/config/helper/startup";
import errorHandler from "@/config/errorException";
import { SwaggerRoute } from "./routes/swagger.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(configApp);
app.get("/", (_req: Request, res: Response) => {
  res.redirect("/api-docs");
});
app.use(SwaggerRoute);
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send({ status: "ok" });
});
app.use(async (req, res, next) => {
  try {
    await createTableConnect();
    next();
  } catch (error) {
    res.status(503).send({ message: "Database connection failed" });
  }
});
app.use(expressRoute);
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`PORT ${PORT} is listening`);
    createTableConnect().catch(() => undefined);
  });
}

export default app;
