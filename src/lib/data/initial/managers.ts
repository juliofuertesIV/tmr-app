import { IManagerRoleId } from "@/lib/types";

export const superAdmin = {
    name: 'Julio F.',
    email: 'juliofuertestarin@gmail.com',
    password: (process.env.SUPERADMIN_PASS as string),
    RoleId: 4 as IManagerRoleId
}