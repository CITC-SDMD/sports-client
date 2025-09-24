import BaseAPIService from '@/api/BaseAPIService'

class AssistanceService extends BaseAPIService {
    async fetchAssistances(params: object): Promise<any> {
        return await this.request(`/assistances`, 'GET', params)
    }

    async fetchAssistancesList(): Promise<any> {
        return await this.request(`/assistances/all/list`, 'GET')
    }

    async fetchAssistance(uuid: string): Promise<any> {
        return await this.request(`/assistances/${uuid}`, 'GET')
    }

    async createAssistance(params: object): Promise<any> {
        return await this.request(`/assistances`, 'POST', params)
    }

    async updateAssistance(params: object, uuid: string): Promise<any> {
        return await this.request(`/assistances/${uuid}`, 'PUT', params)
    }

    async deleteAssistance(uuid: string): Promise<any> {
        return await this.request(`/assistances/${uuid}`, 'DELETE')
    }
}

export const assistanceService = new AssistanceService()