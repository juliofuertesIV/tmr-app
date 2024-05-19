import * as Icon from './_design/icons'

export const adminNavItems = [
    { 
        href: '/admin', 
        label: 'Panel',
        Icon: Icon.dashboard,
        isActive: (path: string) => path === '/admin'
    },
    { 
        href: '/admin/contests', 
        label: 'Concursos',
        Icon: Icon.contest,
        isActive: (path: string) => path.includes('/admin/contests')
    },
    { 
        href: '/admin/inscriptions', 
        label: 'Inscripciones',
        Icon: Icon.inscription,
        isActive: (path: string) => path.includes('/admin/inscriptions')
    },
    { 
        href: '/admin/brands', 
        label: 'Marcas',
        Icon: Icon.brands,
        isActive: (path: string) => path.includes('/admin/brands')
    },
    { 
        href: '/admin/social', 
        label: 'Redes sociales',
        Icon: Icon.instagram,
        isActive: (path: string) => path.includes('/admin/social')
    },
    { 
        href: '/admin/genres', 
        label: 'Géneros',
        Icon: Icon.genres,
        isActive: (path: string) => path.includes('/admin/genres')
    },    
    { 
        href: '/admin/users', 
        label: 'Usuarios',
        Icon: Icon.users,
        isActive: (path: string) => path.includes('/admin/users')
    },
    { 
        href: '/admin/logout', 
        label: 'Log out',
        Icon: Icon.logout,
        isActive: (path: string) => path === '/admin/logout'
     }
]