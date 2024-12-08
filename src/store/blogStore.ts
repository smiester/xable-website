import { create } from 'zustand';
import { BlogPost, BlogStore } from '../types/blog';

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  addPost: (post: BlogPost) =>
    set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id: string, updatedPost: Partial<BlogPost>) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      ),
    })),
  deletePost: (id: string) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
  getPost: (id: string) => get().posts.find((post) => post.id === id),
}));