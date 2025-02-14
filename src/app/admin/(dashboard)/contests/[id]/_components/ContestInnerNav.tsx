'use client'

import { Contest } from "@/types/contests"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { 
        name: 'Información', 
        value: '',
        getPath: (contest: Contest) => `/admin/contests/${ contest.id }`,
        isAssociation: false },
    { 
        name: 'Branding', 
        value: 'brands',
        getPath: (contest: Contest) => `/admin/contests/${ contest.id }/brands`,
        isAssociation: false },
    { 
        name: 'Redes sociales', 
        value: 'social',
        getPath: (contest: Contest) => `/admin/contests/${ contest.id }/associate/social`,
        isAssociation: true },
    { 
        name: 'Configuración', 
        value: 'params',
        getPath: (contest: Contest) => `/admin/contests/${ contest.id }/associate/params`,
        isAssociation: true },
    { 
        name: 'Imágenes', 
        value: 'media',
        getPath: (contest: Contest) => `/admin/contests/${ contest.id }/media`,
        isAssociation: false },
    { 
        name: 'Estado', 
        value: 'states',
        getPath: (contest: Contest) => `/admin/contests/${ contest.id }/states`,
        isAssociation: false },
    { 
        name: 'Footer', 
        value: 'footer',
        getPath: (contest: Contest) => `/admin/footers/${ contest.FooterId }`,
        isAssociation: false },
    { 
        name: 'Gestionar inscripciones', 
        value: 'inscriptions',
        getPath: (contest: Contest) => `/admin/contests/${ contest.id }/inscriptions`,
        isAssociation: false },
]

export default function ContestInnerNav({ contest } : { contest: Contest }) {

    const path = usePathname()

    const isActive = (value: string) => !!value ? path.includes(value) : path === `/admin/contests/${ contest.id }`

    return (
        <menu className="w-full flex flex-wrap gap-4 items-center pt-2 pb-4">
            { 
                navItems.map((item, index) => 
                    <Link
                        className="text-lg tmr-link data-[active='true']:pointer-events-none"
                        href={ item.getPath(contest) }
                        key={ index }
                        data-active={ isActive(item.value) }
                    >
                        <li>{ item.name }</li>
                    </Link>
                ) 
            }
        </menu>
    )
}
