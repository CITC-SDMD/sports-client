import BaseAPIService from '@/api/BaseAPIService'

class AuthService extends BaseAPIService {
    async fetchUsers(params: object): Promise<any> {
        return await this.request(`/users`, 'GET', params)
    }

    async fetchUser(uuid: string): Promise<any> {
        return await this.request(`/users/${uuid}`, 'GET')
    }

    async createUser(params: object): Promise<any> {
        return await this.request(`/users`, 'POST', params)
    }

    async updateUser(params: object, uuid: string): Promise<any> {
        return await this.request(`/users/${uuid}`, 'PUT', params)
    }

    async toggleTheme(params: object, uuid: string): Promise<any> {
        return await this.request(`/users/${uuid}/toggle-theme`, 'PUT')
    }

    async deleteUser(uuid: string): Promise<any> {
        return await this.request(`/users/${uuid}`, 'DELETE')
    }
}

export const authService = new AuthService()