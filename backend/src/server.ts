import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { pino } from "pino";

import { env } from "@common/utils/envConfig";
import errorHandler from "@common/middleware/errorHandler";

import { categoryRouter } from "@modules/categories/categoryRouter";
import { projectRouter } from "@modules/project/projectRouter";
import { userRouter } from "@modules/user/userRouter";
import { taskRouter } from "@modules/task/taskRouter";
import { resourceRouter } from "@modules/resource/resourceRouter";

const logger = pino({ name: "server start" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Routes
app.use("/v1/category", categoryRouter);
app.use("/v1/project",projectRouter);
app.use("/v1/user",userRouter);
app.use("/v1/task",taskRouter);
app.use("/v1/resource",resourceRouter);


// Error handlers
app.use(errorHandler());

export { app, logger };
