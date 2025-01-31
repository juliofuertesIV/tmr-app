'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { name: 'Información', value: '', association: false },
    { name: 'Branding', value: 'brand', association: false },
    { name: 'Redes sociales', value: 'social', association: true },
    { name: 'Géneros', value: 'genres', association: true },
    { name: 'Configuración', value: 'params', association: true },
    { name: 'Imágenes', value: 'media', association: true },
    { name: 'Sponsors', value: 'sponsors', association: true },
    { name: 'Estado', value: 'state', association: false },
]

export default function ContestEditionNav({ id } : { id: string | number }) {

    const path = usePathname()

    const isActive = (value: string) => {
        return !!value ? path.includes(value) : path === `/admin/contests/${ id }/edit`
    }

    const getHref = (item: any) => {
        return !!item.association ? `/admin/contests/${ id }/edit/associate/${ item.value }` : `/admin/contests/edit/${ id }/${ item.value }`
    }

    return (
        <menu className="w-full flex flex-wrap gap-4 items-center pt-2 pb-4">
            { 
                navItems.map((item, index) => 
                    <Link
                        className="text-lg tmr-link"
                        href={ getHref(item) }
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
