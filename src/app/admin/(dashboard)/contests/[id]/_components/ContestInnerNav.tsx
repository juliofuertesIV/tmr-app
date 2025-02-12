'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { name: 'Información', value: '', isAssociation: false },
    { name: 'Branding', value: 'brands', isAssociation: false },
    { name: 'Redes sociales', value: 'social', isAssociation: true },
    { name: 'Configuración', value: 'params', isAssociation: true },
    { name: 'Imágenes', value: 'media', isAssociation: false },
    { name: 'Estado', value: 'states', isAssociation: false },
    { name: 'Footer', value: 'footer', isAssociation: false },
    { name: 'Gestionar inscripciones', value: 'inscriptions', isAssociation: false },
]

export default function ContestInnerNav({ id } : { id: string | number }) {

    const path = usePathname()

    const isActive = (value: string) => {
        return !!value ? path.includes(value) : path === `/admin/contests/${ id }`
    }

    const getHref = (item: any) => {
        return !!item.isAssociation ? `/admin/contests/${ id }/associate/${ item.value }` : `/admin/contests/${ id }/${ item.value }`
    }

    return (
        <menu className="w-full flex flex-wrap gap-4 items-center pt-2 pb-4">
            { 
                navItems.map((item, index) => 
                    <Link
                        className="text-lg tmr-link data-[active='true']:pointer-events-none"
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
