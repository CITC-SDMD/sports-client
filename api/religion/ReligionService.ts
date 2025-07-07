import BaseAPIService from '@/api/BaseAPIService'

class ReligionService extends BaseAPIService {
    async fetchReligionList(): Promise<any> {
        return await this.request(`/religions/all/list`, 'GET')
    }
}

export const religionService = new ReligionService()