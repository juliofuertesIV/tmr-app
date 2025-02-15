import * as Icon from '../design/icons'
import { CollectionNames, ManagerRoleId } from "@/types"
import { SVGProps } from "react"
import { JSX } from 'react'

export type IAdminNavItem = {
    collection: CollectionNames | 'logs' | null,
    label: string,
    isActive: (path: string) => boolean,
    minimumRole: ManagerRoleId
}

export type IAdminNavSection = {
    label: string,
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    minimumRole: ManagerRoleId,
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
                isActive: (path: string) => path.includes('/admin/logs') && !path.includes('/logs/'),
                minimumRole: 3
            },
            { 
                collection: 'managers', 
                label: 'Usuarios',
                isActive: (path: string) => path.includes('/admin/managers') && !path.includes('/managers/'),
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
                isActive: (path: string) => path.includes('/admin/brands') && !path.includes('/brands/'),
                minimumRole: 2
            },
            { 
                collection: 'social', 
                label: 'RRSS',
                isActive: (path: string) => path.includes('/admin/social') && !path.includes('/social/'),
                minimumRole: 2
            },
            { 
                collection: 'footers', 
                label: 'Footers',
                isActive: (path: string) => path.includes('/admin/footers') && !path.includes('/footers/'),
                minimumRole: 2
            },
            { 
                collection: 'sponsors', 
                label: 'Sponsors',
                isActive: (path: string) => path.includes('/admin/sponsors') && !path.includes('/sponsors/'),
                minimumRole: 2
            },
            { 
                collection: 'tagCategories', 
                label: 'Etiquetas',
                isActive: (path: string) => path.includes('/admin/tags') && !path.includes('/tags/'),
                minimumRole: 2
            },
        ]
    }
]