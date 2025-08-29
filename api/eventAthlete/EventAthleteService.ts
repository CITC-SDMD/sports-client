import BaseAPIService from '@/api/BaseAPIService'

class EventAthleteService extends BaseAPIService {
    async createEventAthlete(params: object): Promise<any> {
        return await this.request(`/event-athletes`, 'POST', params)
    }
}

export const eventAthleteService = new EventAthleteService()