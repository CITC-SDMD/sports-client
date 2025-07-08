import BaseAPIService from '@/api/BaseAPIService'

class CoachAthleteService extends BaseAPIService {
    async createCoachAthlete(params: object): Promise<any> {
        return await this.request(`/coach-athletes`, 'POST', params)
    }
}

export const coachAthleteService = new CoachAthleteService()