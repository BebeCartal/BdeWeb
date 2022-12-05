import create from 'zustand';

export const useUserStore = create((set) => ({
	userToken: '',
	setUserToken: (userToken) => set((state) => ({ userToken: userToken })),
}));