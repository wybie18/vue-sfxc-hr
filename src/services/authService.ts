import { api, type ApiResponse } from '@/api'
import type { LoginCredentials, LoginResponse, User } from '@/types/user'

const BASE_URL = '/auth'

export const authService = {
    /**
     * Login with username and password
     */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await api.post<ApiResponse<LoginResponse>>(
            `${BASE_URL}/login`,
            credentials,
        )
        return response.data.data
    },

    /**
     * Logout the current user
     */
    async logout(): Promise<void> {
        await api.post(`${BASE_URL}/logout`)
    },

    /**
     * Get the current authenticated user
     */
    async me(): Promise<User> {
        const response = await api.get<ApiResponse<User>>(`${BASE_URL}/me`)
        return response.data.data
    },
}

export default authService
