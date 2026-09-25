import { Router } from "express";

import { authenticate } from "../../common/middleware/authenticate.js";
import { getMe } from "./user.controller.js";

const router = Router();

router.get(
  "/me",
  authenticate,
  getMe
);
router.patch("/me",authenticate,)

export default router;