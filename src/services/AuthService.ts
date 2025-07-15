import $apiUser from "@/http/apiUser.ts";

interface RegUserData {
    name: string;
    email: string;
    number?: string;
    password: string;
}

export default class AuthService {
    static headers = {
        'Content-Type': 'application/json'
    };

    static async login(email: string, password: string) {
        const options = {headers: this.headers};
        const credentials = {"email": email, "password": password};

        return $apiUser.post('api/auth/login', credentials, options);
    }

    static async registration(credentials: RegUserData) {
        const options = {headers: this.headers};

        return $apiUser.post('api/auth/register', credentials, options);
    }

    static async logout(sessionId: string) {
        const options = {headers: this.headers};

        return $apiUser.post(`api/auth/logout?sessionId=${sessionId}`, options);
    }

    static async requestResetPassword(email: string) {
        const options = {headers: this.headers};

        return $apiUser.post('api/auth/requestResetPassword', {"email": email}, options);
    }

    static async resetPassword(token: string, new_password: string) {
        const options = {headers: this.headers};
        const passwordResetData = {token: token, new_password: new_password};

        return $apiUser.post('api/auth/resetPassword', passwordResetData, options);
    }
}