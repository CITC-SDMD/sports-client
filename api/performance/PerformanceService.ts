import BaseAPIService from '@/api/BaseAPIService'

class PerformanceService extends BaseAPIService {
    async fetchPerformanceList(params: object): Promise<any> {
        return await this.request(`/performances`, 'GET', params)
    }
}

export const performanceService = new PerformanceService()