import { create } from "zustand";
import { persist } from "zustand/middleware";



export const useAuthStore = create(
    persist( // сохраняем все состояния в localStorage
        (set) => ({
            accessToken: null, // именно тот токен с информацией о нас
            refreshToken: null, // токен который нужен чтобы обновить access token

            setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),

            logout: () => set({ accessToken: null, refreshToken: null })
        }),
        { name: 'auth-storage' }
    )
)

export const useIsAuth = () => useAuthStore((s) => Boolean(s.accessToken)) 