import type { Request, Response } from "express";
import * as postService from "../../services/post.js";
import type {
    GetPostsQueryDto,
    GetPostParamsDto,
    CreatePostDto
} from "../dto/post.js";

export function getPosts(
    req: Request<{}, {}, {}, GetPostsQueryDto>,
    res: Response
): void {
    const { category, take } = req.query;

    let takeNumber: number | undefined;

    if (take !== undefined) {
        takeNumber = Number(take);

        if (!Number.isInteger(takeNumber) || takeNumber <= 0) {
            res.status(400).json({
                error: "Invalid take"
            });
            return;
        }
    }

    if (category !== undefined && category.trim() === "") {
        res.status(400).json({
            error: "Invalid category"
        });
        return;
    }

    const posts = postService.getPosts(
        category?.trim(),
        takeNumber
    );

    res.status(200).json(posts);
}

export function getPostById(
    req: Request<GetPostParamsDto>,
    res: Response
): void {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
            error: "Invalid post id"
        });
        return;
    }

    const post = postService.getPostById(id);

    if (!post) {
        res.status(404).json({
            error: "Post not found"
        });
        return;
    }

    res.status(200).json(post);
}

export async function createPost(
    req: Request<{}, {}, CreatePostDto>,
    res: Response
): Promise<void> {
    const { title, content, author, category } = req.body;

    if (
        typeof title !== "string" ||
        title.trim() === "" ||
        typeof content !== "string" ||
        content.trim() === "" ||
        typeof author !== "string" ||
        author.trim() === "" ||
        typeof category !== "string" ||
        category.trim() === ""
    ) {
        res.status(422).json({
            error: "Invalid post data"
        });
        return;
    }

    const post = await postService.createPost({
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        category: category.trim()
    });

    res.status(201).json(post);
}