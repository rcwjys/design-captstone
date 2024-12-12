import express, { Response, NextFunction, Request } from "express";
import cors from "cors";
import { corsUrl } from "./config";
import {
  ApiError,
  ErrorType,
  InternalError,
  NotFoundError,
} from "./src/core/ApiError";
import { environment } from "./config";
import router from "./src/routes/index";
import path from "path";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ extended: false, limit: "10mb", parameterLimit: 50000 })
);

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use("/", router);

app.use("/evidence", express.static(path.join(__dirname, "public/evidence")));
app.use("/reward", express.static(path.join(__dirname, "public/reward")));
app.use("/trx", express.static(path.join(__dirname, "public/trx")));

app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      console.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
  } else {
    console.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    console.error(err);
    if (environment === "development") {
      res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
