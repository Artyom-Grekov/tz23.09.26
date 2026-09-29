import type { Post } from "../types/post.js";

const posts: Post[] = [
    {
        id: 1,
        title: "JavaScript Basics",
        content: "Introduction to JavaScript",
        author: "Alex",
        category: "programming"
    },
    {
        id: 2,
        title: "Node.js",
        content: "Introduction to Node.js",
        author: "John",
        category: "programming"
    },
    {
        id: 3,
        title: "Football",
        content: "Football news",
        author: "Mike",
        category: "sport"
    },
    {
        id: 4,
        title: "Express",
        content: "Express framework",
        author: "Anna",
        category: "programming"
    }
];

export function getAll(category?: string, take?: number): Post[] {
    let result = [...posts];

    if (category) {
        result = result.filter((post) => post.category === category);
    }

    if (take !== undefined) {
        result = result.slice(0, take);
    }

    return result;
}

export function getById(id: number): Post | undefined {
    return posts.find((post) => post.id === id);
}

export function addPost(newPost: Post): Promise<Post> {
    return new Promise((resolve) => {
        setTimeout(() => {
            posts.push(newPost);
            resolve(newPost);
        }, 300);
    });
}