import BaseAPIService from '@/api/BaseAPIService'

class AthleteService extends BaseAPIService {
    async fetchAthletes(params: object): Promise<any> {
        return await this.request(`/athletes`, 'GET', params)
    }

    async fetchAthleteList(): Promise<any> {
        return await this.request(`/athletes/all/list`, 'GET')
    }

    async fetchAthlete(uuid: string): Promise<any> {
        return await this.request(`/athletes/${uuid}`, 'GET')
    }

    async fetchCoachesByAthlete(params: object): Promise<any> {
        return await this.request(`/athletes/coach/list`, 'GET', params)
    }

    async createAthlete(params: object): Promise<any> {
        return await this.request(`/athletes`, 'POST', params)
    }

    async updateAthlete(params: object, uuid: string): Promise<any> {
        return await this.request(`/athletes/${uuid}/update`, 'POST', params)
    }

    async deleteAthlete(uuid: string): Promise<any> {
        return await this.request(`/athletes/${uuid}`, 'DELETE')
    }
}

export const athleteService = new AthleteService()