import BaseAPIService from '@/api/BaseAPIService'

class SchoolService extends BaseAPIService {
    async fetchSchoolList(): Promise<any> {
        return await this.request(`/schools/all/list`, 'GET')
    }

    async createSchool(params: object): Promise<any> {
        return await this.request(`/schools`, 'POST', params)
    }
}

export const schoolService = new SchoolService()