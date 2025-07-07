import BaseAPIService from '@/api/BaseAPIService'

class CareerService extends BaseAPIService {
    async fetchCareers(params: object): Promise<any> {
        return await this.request(`/careers`, 'GET', params)
    }

    async fetchCareerList(): Promise<any> {
        return await this.request(`/careers/all/list`, 'GET')
    }

    async fetchCareer(uuid: string): Promise<any> {
        return await this.request(`/careers/${uuid}`, 'GET')
    }

    async createCareer(params: object): Promise<any> {
        return await this.request(`/careers`, 'POST', params)
    }

    async updateCareer(params: object, uuid: string): Promise<any> {
        return await this.request(`/careers/${uuid}`, 'PUT', params)
    }

    async deleteCareer(uuid: string): Promise<any> {
        return await this.request(`/careers/${uuid}`, 'DELETE')
    }
}

export const careerService = new CareerService()