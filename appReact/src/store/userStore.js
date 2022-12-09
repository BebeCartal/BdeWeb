import create from 'zustand';

export const useUserStore = create((set) => ({
	userToken: '',
	users: [],
	userConnect: '',
	role: '',
	setUserToken: (userToken) => set((state) => ({ userToken: userToken })),
	setUsers: (users) => set((state) => ({ users: users })),
	setConnect: (userConnect) => set((state) =>({userConnect: userConnect})),
	setRole: (role) => set((state) =>({role: role})),
}));