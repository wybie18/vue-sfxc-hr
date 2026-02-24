export interface User {
    id: number
    name: string
    username: string
    role: 'admin' | 'member'
    created_at: string
    updated_at: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface LoginResponse {
    user: User
    token: string
}
