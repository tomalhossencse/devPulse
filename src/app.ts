import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
app.get("/", async (req: Request, res: Response) => {
  res.send("I am a Root of this server");
});

export default app;
