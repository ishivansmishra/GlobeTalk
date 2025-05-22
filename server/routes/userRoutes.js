import express from "express";
import { checkAuth, login, signup, updateProfile } from "../controllers/userController.js"; // added .js
import { protectRoute } from "../middleware/auth.js"; // added .js

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth); 

export default userRouter;
