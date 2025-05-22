import express from "express";
import { protectRoute } from "../middleware/auth.js";  // add .js extension
import { getMessages, getUsersForSideBar, markMessageAsSeen, sendMessage } from "../controllers/messageController.js"; // add .js extension

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSideBar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);  // fixed missing /
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
