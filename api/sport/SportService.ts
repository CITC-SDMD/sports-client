import BaseAPIService from '@/api/BaseAPIService'

class SportService extends BaseAPIService {
    async fetchSportList(): Promise<any> {
        return await this.request(`/sports/all/list`, 'GET')
    }
}

export const sportService = new SportService()