import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { sendResponse } from "./middlewares/sendResponse";
import authRoutes from "./modules/auth/auth.route";
import { globalError } from "./middlewares/glebalErrorHandler";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", async (req: Request, res: Response) => {
  sendResponse(
    res,
    {
      message: "Hello World",
    },
    200,
  );
});

app.use(globalError);

export default app;
