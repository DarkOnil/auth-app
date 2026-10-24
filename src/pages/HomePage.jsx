import { Link } from "react-router-dom";
import { useIsAuth } from "../store/useAuthStore";


export default function HomePage() {

    const isAuth = useIsAuth()

    return (
        <section>
            <h1>Добро пожаловать!</h1>
            {isAuth ? (
                <Link to='/profile'>Перейти в профиль</Link>   
            ) : (
                <p><Link to='/login'>Войдите</Link> или <Link to='/register'>Зарегистрируйтесь</Link></p>
            )}
        </section>
    )
}