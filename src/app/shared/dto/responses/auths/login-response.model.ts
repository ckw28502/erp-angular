import { Role } from "../../../models/enums/role";

export interface LoginResponse {
    token: string,
    role: Role
}
