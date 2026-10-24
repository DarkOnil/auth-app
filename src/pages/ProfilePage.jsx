
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../api/auth";
import { useAuthStore } from "../store/useAuthStore";
import { decodeJwt } from "../lib/jwt";

export default function ProfilePage() {
    const navigate = useNavigate();
    const clearTokens = useAuthStore((s) => s.logout);
    const token = localStorage.getItem("token");

    const {
        data: user, isLoading, isError, error } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        enabled: Boolean(token),
        retry: false
    });

    const tokenInfo = token ? decodeJwt(token) : null;

    function handleLogout() {
        logout();
        clearTokens();
        navigate("/login");
    }

    if (!token) {
        return (
            <section>
                <h1>Профиль</h1>
                <p>Сначала войдите в аккаунт.</p>
                <button onClick={() => navigate("/login")}>
                    Войти
                </button>
            </section>
        );
    }

    if (isLoading) return <p>Загрузка профиля...</p>;

    if (isError) {
        return (
            <section>
                <h1>Профиль</h1>
                <p>{error.message}</p>
                <button onClick={handleLogout}>Выйти</button>
            </section>
        );
    }

    return (
        <section>
            <h1>Профиль</h1>

            <div style={{
                display: "flex",
                gap: 24,
                alignItems: "center"
            }}>
                <img
                    src={user.avatar}
                    alt="Аватар"
                    width={120}
                    height={120}
                    style={{
                        borderRadius: "50%",
                        objectFit: "cover"
                    }}
                />

                <div>
                    <p><b>Имя:</b> {user.name}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Роль:</b> {user.role}</p>
                    <p><b>ID:</b> {user.id}</p>
                </div>
            </div>

            <div style={{
                marginTop: 32,
                padding: 16,
                background: "#f1f5f9",
                borderRadius: 8
            }}>
                <h3>Что внутри access token</h3>

                <p>
                    <b>ID пользователя:</b>{" "}
                    {tokenInfo?.sub ?? "Нет данных"}
                </p>

                <p>
                    <b>Выдан:</b>{" "}
                    {tokenInfo?.iat
                        ? new Date(tokenInfo.iat * 1000).toLocaleString()
                        : "Нет данных"}
                </p>

                <p>
                    <b>Истекает:</b>{" "}
                    {tokenInfo?.exp
                        ? new Date(tokenInfo.exp * 1000).toLocaleString()
                        : "Нет данных"}
                </p>
            </div>

            <button onClick={handleLogout}>Выйти</button>
        </section>
    )
}
