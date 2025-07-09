import APIError from '@/api/APIError'

class BaseAPIService {
    async request(url: string, method: string, params: object = {}): Promise<any> {
        const runtimeConfig = useRuntimeConfig()
        const token = localStorage.getItem('_token')

        const config: any = {
            baseURL: runtimeConfig.public.apiBaseURL,
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }

        if (method === 'GET') {
            config.params = params // Attach query params for GET requests
        } else {
            config.body = params // Attach body for POST/PUT/DELETE requests
        }

        try {
            return await $fetch(url, config)
        } catch (error: any) {
            this.handleError(error)
        }
    }

    handleError(error: any) {
        const status = error?.response?.status

        switch (status) {
            case 400:
            case 404:
            case 422:
            case 429:
                throw new APIError(error.response._data)
            case 401:
                this.revokeAccess()
                break
            case 500:
                throw new APIError({
                    message: "Server error. Please try again. If the problem persists, contact your system administrator.",
                })
            default:
                throw new APIError({
                    message: "Something went wrong. Please try again. If the problem persists, contact your system administrator.",
                })
        }
    }

    revokeAccess() {
        localStorage.removeItem('_token')
        navigateTo('/')
    }
}

export default BaseAPIService