import BaseAPIService from '@/api/BaseAPIService'

class DocumentService extends BaseAPIService {

    async createDocuments(params: object): Promise<any> {
        return await this.request(`/documents/upload-documents`, 'POST', params)
    }

    async fetchDocuments(params: object): Promise<any> {
        return await this.request(`/documents`, 'GET', params)
    }

    async updateDocuments(params: object, uuid: string): Promise<any> {
        return await this.request(`/documents/${uuid}`, 'PUT', params)
    }

    async deleteDocuments(uuid: string): Promise<any> {
        return await this.request(`/documents/${uuid}`, 'DELETE')
    }
}

export const documentService = new DocumentService()