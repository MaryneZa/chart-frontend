import { create } from 'zustand';
import { User } from '@/types/user';
interface AuthProps {
    user: User | null,
    setUser: (user: User | null) => void,
    clearAuth: () => void
}

export const useAuthStore = create<AuthProps>((set) => ({
    user: null,
    setUser: (user) => set({user: user}),
    clearAuth: () => set({user: null}),
}))