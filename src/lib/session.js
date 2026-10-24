import { useAuthStore } from "../store/useAuthStore";
import { queryClient } from "../queryClient"

export function endSession() {
    useAuthStore.getState().logout() // удалить токены
    queryClient.clear() // удалить весь кэш
}