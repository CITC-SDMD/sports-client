import BaseAPIService from '@/api/BaseAPIService'

class CompetitionService extends BaseAPIService {
    async fetchCompetitionList(): Promise<any> {
        return await this.request(`/competitions/all/list`, 'GET')
    }
}

export const competitionService = new CompetitionService()