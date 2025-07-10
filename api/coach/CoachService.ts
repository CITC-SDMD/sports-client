import BaseAPIService from '@/api/BaseAPIService'

class CoachService extends BaseAPIService {
    async fetchCoaches(params: object): Promise<any> {
        return await this.request(`/coaches`, 'GET', params)
    }

    async fetchCoatchList(): Promise<any> {
        return await this.request(`/coaches/all/list`, 'GET')
    }

    async fetchCoach(uuid: string): Promise<any> {
        return await this.request(`/coaches/${uuid}`, 'GET')
    }

    async fetchAthletesByCoach(params: object): Promise<any> {
        return await this.request(`/coaches/athlete/list`, 'GET', params)
    }

    async createCoach(params: object): Promise<any> {
        return await this.request(`/coaches`, 'POST', params)
    }

    async updateCoach(params: object, uuid: string): Promise<any> {
        return await this.request(`/coaches/${uuid}/update`, 'POST', params)
    }

    async deleteCoach(uuid: string): Promise<any> {
        return await this.request(`/coaches/${uuid}`, 'DELETE')
    }
}

export const coachService = new CoachService()