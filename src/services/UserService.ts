import $apiUser from "@/http/apiUser.ts";

interface UpdateUser {
    name?: string;
    email?: string;
    number?: string;
    role_id?: string;
}

export default class UserService {
    static headers = {
        'Content-Type': 'application/json'
    };

    static async getAllUsers(searchString: string) {
        const options = {headers: this.headers};

        return $apiUser.get(`api/user/getAllUsers?searchString=${searchString}`, options);
    };

    static async updateUser(credentials: UpdateUser, userId: string) {
        const options = {headers: this.headers};

        return $apiUser.patch(`api/user/updateUserData/${userId}`, credentials, options);
    };

    static async deleteUser(userId: string) {
        const options = {headers: this.headers};

        return $apiUser.delete(`api/user/deleteUser/${userId}`, options);
    };
}