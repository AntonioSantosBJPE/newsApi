import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import cors from "cors";
import * as routers from "./routers";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/users", routers.usersRoutes);
app.use("/news", routers.newsRoutes);
app.use("/tags", routers.tagsRoutes);
app.use("/comments", routers.commentsRoutes);

app.use(errorHandler);

export default app;
