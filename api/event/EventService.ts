import BaseAPIService from '@/api/BaseAPIService'

class EventService extends BaseAPIService {
    async fetchEvents(params: object): Promise<any> {
        return await this.request(`/events`, 'GET', params)
    }

    async fetchEventList(): Promise<any> {
        return await this.request(`/events/all/list`, 'GET')
    }

    async fetchEvent(uuid: string): Promise<any> {
        return await this.request(`/events/${uuid}`, 'GET')
    }

    async createEvent(params: object): Promise<any> {
        return await this.request(`/events`, 'POST', params)
    }

    async updateEvent(params: object, uuid: string): Promise<any> {
        return await this.request(`/events/${uuid}`, 'PUT', params)
    }

    async deleteEvent(uuid: string): Promise<any> {
        return await this.request(`/events/${uuid}`, 'DELETE')
    }

    async fetchQualifiedAthletes(params: object, uuid: string): Promise<any> {
        return await this.request(`/events/${uuid}/athletes`, 'GET', params)
    }

    async generateQualifiedAthletes(uuid: string): Promise<any> {
        return await this.request(`/events/${uuid}/athletes/store`, 'POST')
    }

    async sendInvitationToAthletes(params: object): Promise<any> {
        return await this.request(`/events/send-invitation`, 'POST', params)
    }

    async sendEndorsementLetter(params: object): Promise<any> {
        return await this.request(`/events/send-endorsement-letter`, 'POST', params)
    }
}

export const eventService = new EventService()