import { SVGProps } from 'react'
import * as Icon from './_design/icons'
import { IOneOfCollectionNames } from '@/types'

export type IAdminNavItem = {
    collection: IOneOfCollectionNames | 'logout' | null,
    label: string,
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    isActive: (path: string) => boolean
}

export const adminNavItems : IAdminNavItem[] = [
    { 
        collection: null, 
        label: 'Panel',
        Icon: Icon.dashboard,
        isActive: (path: string) => path === '/admin'
    },
    { 
        collection: 'contests', 
        label: 'Concursos',
        Icon: Icon.contest,
        isActive: (path: string) => path.includes('/admin/contests')
    },
    { 
        collection: 'inscriptions', 
        label: 'Inscripciones',
        Icon: Icon.inscription,
        isActive: (path: string) => path.includes('/admin/inscriptions')
    },
    { 
        collection: 'brands', 
        label: 'Marcas',
        Icon: Icon.brands,
        isActive: (path: string) => path.includes('/admin/brands')
    },
    { 
        collection: 'social', 
        label: 'Redes sociales',
        Icon: Icon.instagram,
        isActive: (path: string) => path.includes('/admin/social')
    },
    { 
        collection: 'genres', 
        label: 'Géneros',
        Icon: Icon.genres,
        isActive: (path: string) => path.includes('/admin/genres')
    },    
    { 
        collection: 'managers', 
        label: 'Managers',
        Icon: Icon.users,
        isActive: (path: string) => path.includes('/admin/managers')
    },
    { 
        collection: 'logout', 
        label: 'Log out',
        Icon: Icon.logout,
        isActive: (path: string) => path === '/admin/logout'
     }
]