import * as Icon from '../design/icons'
import { ICollectionNames, IManagerRoleId } from "@/types"
import { SVGProps } from "react"

export type IAdminNavItem = {
    collection: ICollectionNames | 'logs' | null,
    label: string,
    isActive: (path: string) => boolean,
    minimumRole: IManagerRoleId
}

export type IAdminNavSection = {
    label: string,
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    minimumRole: IManagerRoleId,
    items?: IAdminNavItem[]
}

export const adminNavSections : IAdminNavSection[] = [
    {
        label: 'Admin',
        Icon: Icon.admin,
        minimumRole: 3,
        items: [
            { 
                collection: 'logs', 
                label: 'Logs',
                isActive: (path: string) => path.includes('/admin/logs'),
                minimumRole: 3
            },
            { 
                collection: 'managers', 
                label: 'Usuarios',
                isActive: (path: string) => path.includes('/admin/managers'),
                minimumRole: 3
            },
        ]
    },
    {
        label: 'Ajustes',
        Icon: Icon.cog,
        minimumRole: 2,
        items: [
            { 
                collection: 'brands', 
                label: 'Marcas',
                isActive: (path: string) => path.includes('/admin/brands'),
                minimumRole: 2
            },
            { 
                collection: 'social', 
                label: 'Redes sociales',
                isActive: (path: string) => path.includes('/admin/social'),
                minimumRole: 2
            },
            { 
                collection: 'sponsors', 
                label: 'Sponsors',
                isActive: (path: string) => path.includes('/admin/sponsors'),
                minimumRole: 2
            },
            { 
                collection: 'genres', 
                label: 'Géneros',
                isActive: (path: string) => path.includes('/admin/genres'),
                minimumRole: 2
            },
        ]
    }
]