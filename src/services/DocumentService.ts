import $apiDoc from "@/http/apiDoc.ts";
import type {AxiosRequestConfig} from "axios";

export default class DocumentService {
    static headers = {
        'Content-Type': 'application/json'
    };

    static async getAllUserDocuments(searchString: string) {
        const options: AxiosRequestConfig = {headers: this.headers};

        return $apiDoc.get(`api/documents/getAllUsersDocuments?searchString=${searchString}`, options);
    }

    static async getCertainUserDocuments(userId: string, searchString: string) {
        const options: AxiosRequestConfig = {headers: this.headers};

        return $apiDoc.get(`api/documents/getCertainUserDocuments/${userId}?searchString=${searchString}`, options);
    }

    static async downloadDocument(documentId: string) {
        const options: AxiosRequestConfig = {headers: this.headers, responseType: 'blob'};

        return $apiDoc.get(`api/documents/downloadDocument/${documentId}`, options);
    }

    static async deleteDocument(documentId: string) {
        const options: AxiosRequestConfig = {headers: this.headers};

        return $apiDoc.delete(`api/documents/deleteDocument/${documentId}`, options);
    }

    static async previewDocument(documentId: string) {
        const options: AxiosRequestConfig = {headers: this.headers, responseType: 'blob'};

        return $apiDoc.get(`api/documents/previewDocument/${documentId}`, options);
    }

    static async uploadDocument(formData: FormData) {
        const options: AxiosRequestConfig = {headers: {'Content-Type': 'multipart/form-data'}};

        return $apiDoc.post(`api/documents/uploadDocument`, formData, options);
    }

    static async uploadDocumentForUser(formData: FormData, userId: string) {
        const options: AxiosRequestConfig = {headers: {'Content-Type': 'multipart/form-data'}};

        return $apiDoc.post(`api/documents/uploadDocumentForUser/${userId}`, formData, options);
    }
}