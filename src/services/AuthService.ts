import $apiUser from "@/http/apiUser.ts";

export default class AuthService {
    static headers = {
        'Content-Type': 'application/json'
    };

    static async login(email: string, password: string) {
        const options = {headers: this.headers};
        const credentials = {"email": email, "password": password};

        return $apiUser.post('api/auth/login', credentials, options);
    }
}