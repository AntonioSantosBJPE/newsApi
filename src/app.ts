import "express-async-errors";
import express, { Application, Request, Response } from "express";
import { errorHandler } from "./errors";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/teste", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json("teste");
});

app.use(errorHandler);

export default app;
