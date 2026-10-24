import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { login, register } from "../api/auth";

export function useLogin() {
    const setTokens = useAuthStore((s) => s.setTokens)

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setTokens({
                accessToken: data.access_token,
                refreshToken: data.refresh_token
            })
        }
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: register
    });
}