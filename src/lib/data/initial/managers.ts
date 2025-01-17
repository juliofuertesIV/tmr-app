import { IManagerRoleId } from "@/types";

export const superAdmin = {
    name: (process.env.SUPERADMIN_NAME as string),
    email: (process.env.SUPERADMIN_EMAIL as string),
    password: (process.env.SUPERADMIN_PASS as string),
    RoleId: 4 as IManagerRoleId
}

