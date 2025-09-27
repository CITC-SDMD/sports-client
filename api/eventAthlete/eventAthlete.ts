import BaseAPIService from '@/api/BaseAPIService'

class EventAthleteService extends BaseAPIService {

    async fetchEventAthlete(params: object, uuid: string): Promise<any> {
        return await this.request(`/event-athlete/${uuid}`, 'GET', params)
    }
}

export const eventAthleteService = new EventAthleteService()