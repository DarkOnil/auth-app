

export function decodeJwt(token) {
    try {
        const payload = token.split('.')[1]
        const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        return JSON.parse(json)
    } catch { 
        return null
    }
}

export function isTokenExpired(token) {
    const payload = decodeJwt(token)
    if (!payload.exp) return true
    return payload.exp * 1000 < Date.now()
}