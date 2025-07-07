import $apiDoc from "@/http/apiDoc.ts";
import type {AxiosRequestConfig} from "axios";

export default class DocumentService {
    static headers = {
        'Content-Type': 'application/json'
    };

    static async getAllUserDocuments(searchString: string) {
        const options = {headers: this.headers};

        return $apiDoc.get(`api/documents/getAllUsersDocuments?searchString=${searchString}`, options);
    }

    static async getCertainUserDocuments(userId: string, searchString: string) {
        const options = {headers: this.headers};

        return $apiDoc.get(`api/documents/getCertainUserDocuments/${userId}?searchString=${searchString}`, options);
    }

    static async downloadDocument(documentId: string) {
        const options: AxiosRequestConfig = {headers: this.headers, responseType: 'blob'};

        return $apiDoc.get(`api/documents/downloadDocument/${documentId}`, options);
    }

    static async previewDocument(documentId: string) {
        const options: AxiosRequestConfig = {headers: this.headers, responseType: 'blob'};

        return $apiDoc.get(`api/documents/previewDocument/${documentId}`, options);
    }
}