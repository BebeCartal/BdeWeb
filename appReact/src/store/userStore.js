import create from 'zustand';

export const useUserStore = create((set) => ({
	userToken: '',
	setUsersToken: (userToken) => set((state) => ({ userToken: usersToken })),
}));