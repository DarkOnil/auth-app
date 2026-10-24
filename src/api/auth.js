
const BASE_URL = "https://api.escuelajs.co/api/v1"



export async function login({ email, password }) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error("Неверный email или пароль")

    const data = await res.json()
    localStorage.setItem('token', data.access_token)
    return data
}

export async function register({ name, email, password, avatar }) {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, avatar })
    })
    if (!res.ok) throw new Error("Ошибка регистрации")
    return res.json()
}

export async function getProfile() {

    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}`}
    })
    if (!res.ok) throw new Error('Не авторизован')
    return res.json()
}

export function logout() {
    localStorage.removeItem('token')
}
