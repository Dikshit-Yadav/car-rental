import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./common/errors/error-handler.js";
import { rateLimiter } from "./common/middleware/rate-limitter.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);


app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Car Rental API is running",
  });
});

app.use("/auth", authRoutes);

//error handler
app.use(errorHandler);

export default app;