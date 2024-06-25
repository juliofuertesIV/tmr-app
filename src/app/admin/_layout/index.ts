import { SVGProps } from 'react'
import * as Icon from './_design/icons'
import { IManagerRoleId, ICollectionNames } from '@/types'

export type IAdminNavItem = {
    collection: ICollectionNames | 'logout' |'logs' | null,
    label: string,
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    isActive: (path: string) => boolean,
    minimumRole: IManagerRoleId
}

export const adminNavItems : IAdminNavItem[] = [
    { 
        collection: null, 
        label: 'Panel',
        Icon: Icon.dashboard,
        isActive: (path: string) => path === '/admin',
        minimumRole: 1
    },
    { 
        collection: 'contests', 
        label: 'Concursos',
        Icon: Icon.contest,
        isActive: (path: string) => path.includes('/admin/contests'),
        minimumRole: 2,
    },
    { 
        collection: 'inscriptions', 
        label: 'Inscripciones',
        Icon: Icon.inscription,
        isActive: (path: string) => path.includes('/admin/inscriptions'),
        minimumRole: 2
    },
    { 
        collection: 'brands', 
        label: 'Marcas',
        Icon: Icon.brands,
        isActive: (path: string) => path.includes('/admin/brands'),
        minimumRole: 2
    },
    { 
        collection: 'social', 
        label: 'Redes sociales',
        Icon: Icon.instagram,
        isActive: (path: string) => path.includes('/admin/social'),
        minimumRole: 2
    },
    { 
        collection: 'sponsors', 
        label: 'Sponsors',
        Icon: Icon.tag,
        isActive: (path: string) => path.includes('/admin/sponsors'),
        minimumRole: 2
    },
    { 
        collection: 'genres', 
        label: 'Géneros',
        Icon: Icon.genres,
        isActive: (path: string) => path.includes('/admin/genres'),
        minimumRole: 2
    },    
    { 
        collection: 'managers', 
        label: 'Managers',
        Icon: Icon.users,
        isActive: (path: string) => path.includes('/admin/managers'),
        minimumRole: 3
    },
    { 
        collection: 'logs', 
        label: 'Logs',
        Icon: Icon.message,
        isActive: (path: string) => path.includes('/admin/logs'),
        minimumRole: 4
    },
    { 
        collection: 'logout', 
        label: 'Log out',
        Icon: Icon.logout,
        isActive: (path: string) => path === '/admin/logout',
        minimumRole: 1
     }
]