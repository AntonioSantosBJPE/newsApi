import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import { usersRoutes } from "./routers/users.routes";
import { newsRoutes } from "./routers/news.routes";
import { tagsRoutes } from "./routers/tags.routes";
import { commentsRoutes } from "./routers/comments.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", usersRoutes);
app.use("/news", newsRoutes);
app.use("/tags", tagsRoutes);
app.use("/comments", commentsRoutes);

app.use(errorHandler);

export default app;
