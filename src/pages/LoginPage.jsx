import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useAuth";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const loginMutation = useLogin();
    const navigate = useNavigate();

    function handleSumbit(e) {
        e.preventDefault();

        loginMutation.mutate(
            { email, password },
            { onSuccess: () => navigate("/profile") }
        );
    }

    return (
        <section style={{ maxWidth: 380 }}>
            <h1>Вход</h1>

            <form onSubmit={handleSumbit}>
                <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassowrd(e.target.value)} required/>

                {loginMutation.isError && (
                    <p>{loginMutation.error.message}</p>
                )}
                <button type="sumbit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Входим..." : "Войти"}
                </button>
            </form>

            <p>
                Нет аккаунта ?
                <Link to='/register'>Зарегистрироваться</Link>
            </p>
        </section>
    )
}