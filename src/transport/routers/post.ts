import express from "express";
import {
    getPosts,
    getPostById,
    createPost
} from "../handlers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);

export default router;