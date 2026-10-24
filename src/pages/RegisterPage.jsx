import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../hooks/useAuth";


export default function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [avatar, setAvatar] = useState("https://i.imgur.com/LDOO4Qs.jpg");

    const registerMutation = useRegister();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if(password !== repeatPassword) return;

        registerMutation.mutate(
            { name, email, password, avatar },
            { onSuccess: () => navigate("/login") }
        );
    }


    return (
        <section style={{ maxWidth: 420 }}>
            <h1>Регистрация</h1>

            <form onSubmit={handleSubmit}>
                <input placeholder="Name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />   

                <input type="email" autoComplete="email" value={email} onChange={(e) =>  setEmail(e.target.value)} required />

                <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <input type="password" placeholder="Повторите пароль" autoComplete="new-password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />

                {repeatPassword && password !== repeatPassword && (
                    <p>Пароли не совпадают</p>
                )}

                <input type="url" placeholder="Ссылка на аватар" value={avatar} onChange={(e) => setAvatar(e.target.value)} required />

                {registerMutation.isError && (
                    <p>{registerMutation.error.message}</p>
                )}
                
                {registerMutation.isSuccess && (
                    <p>Регистрация прошла успешно</p>
                )}

                <button type="submit"
                disabled={
                    registerMutation.isPending || password !== repeatPassword
                }
                >
                    {registerMutation.isPending
                    ? "Регистрируем..."
                    : "Зарегистрироваться"}
                </button>
            </form>

            <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </section>
    )
}