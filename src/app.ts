import "express-async-errors";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import cors from "cors";
import { usersRoutes } from "./routers/users.routes";
import { newsRoutes } from "./routers/news.routes";
import { tagsRoutes } from "./routers/tags.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/news", newsRoutes);
app.use("/tags", tagsRoutes);

app.use(errorHandler);

export default app;
