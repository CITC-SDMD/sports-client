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

    async fetchAssistanceList(params: object): Promise<any> {
        return await this.request(`/athletes/assistance/list`, 'GET', params)
    }

    async fetchAssistanceListApproved(params: object): Promise<any> {
        return await this.request(`/athletes/approved/list`, 'GET', params)
    }

    async fetchCertificate(uuid: string): Promise<any> {
        return await this.request(`/athletes/${uuid}/download-certificate`, 'GET')
    }

    async createAthlete(params: object): Promise<any> {
        return await this.request(`/athletes`, 'POST', params)
    }

    async saveAssistanceApprove(params: object): Promise<any> {
        return await this.request(`/athletes/update/assistance-generated`, 'PUT', params)
    }

    async updateAthlete(params: object, uuid: string): Promise<any> {
        return await this.request(`/athletes/${uuid}/update`, 'POST', params)
    }

    async deleteAthlete(uuid: string): Promise<any> {
        return await this.request(`/athletes/${uuid}`, 'DELETE')
    }
}

export const athleteService = new AthleteService()