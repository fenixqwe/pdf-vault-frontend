import $apiUser from "@/http/apiUser.ts";

export default class RoleService {
    static headers = {
        'Content-Type': 'application/json'
    };

    static async getAllRoles() {
        const options = {headers: this.headers};

        return $apiUser.get(`api/roles/getAllRoles`, options);
    };
}