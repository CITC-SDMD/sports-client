import BaseAPIService from '@/api/BaseAPIService'

class DocumentService extends BaseAPIService {
    async fetchDocuments(params: object): Promise<any> {
        return await this.request(`/documents`, 'GET', params)
    }

    async deleteDocuments(uuid: string): Promise<any> {
        return await this.request(`/documents/${uuid}`, 'DELETE')
    }
}

export const documentService = new DocumentService()