import * as postRepository from "../repositories/post.js";
import type { CreatePostInput, Post } from "../types/post.js";

export function getPosts(category?: string, take?: number): Post[] {
    return postRepository.getAll(category, take);
}

export function getPostById(id: number): Post | undefined {
    return postRepository.getById(id);
}

export async function createPost(data: CreatePostInput): Promise<Post> {
    const posts = postRepository.getAll();

    const newPost: Post = {
        id: posts.length + 1,
        title: data.title,
        content: data.content,
        author: data.author,
        category: data.category
    };

    return postRepository.addPost(newPost);
}