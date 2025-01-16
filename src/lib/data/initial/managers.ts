import { IManagerRoleId } from "@/types";

export const superAdmin = {
    name: 'Julio F.',
    email: 'juliofuertestarin@gmail.com',
    password: (process.env.SUPERADMIN_PASS as string),
    hash: (process.env.SUPERADMIN_HASH as string),
    salt: (process.env.SUPERADMIN_SALT as string),
    RoleId: 4 as IManagerRoleId
}

