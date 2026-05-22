import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { sendResponse } from "./middlewares/sendResponse";

const app: Application = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  sendResponse(
    res,
    {
      message: "Hello World",
    },
    200,
  );
});

export default app;
