import create from 'zustand';

export const usePostStore = create((set) => ({
	posts: [],
	setPosts: (posts) => set((state) => ({ posts: posts })),
}));
