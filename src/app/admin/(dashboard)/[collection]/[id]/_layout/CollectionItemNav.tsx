'use client'

import { CollectionNames } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItemsByCollectionName = {
    brands: [
        { name: 'Información', value: '', association: false },
    ],
    social: [
        { name: 'Información', value: '', association: false },
    ],
    managers: [
        { name: 'Información', value: '', association: false },
        { name: 'Rol', value: 'role', association: false },
    ],
    footers: [
        { name: 'Información', value: '', association: false },
        { name: 'Sponsors', value: 'sponsors', association: true },
    ],
    sponsors: [
        { name: 'Información', value: '', association: false },
        { name: 'Imágenes', value: 'media', association: false },
    ],
    tagCategories: [
        { name: 'Información', value: '', association: false },
    ],
    tags: [
        { name: 'Información', value: '', association: false },
    ]
} as {
    [key in CollectionNames]: { name: string, value: 'media' | 'role' | '', association: boolean }[]
}

export default function CollectionItemNav({ collection, id } : { collection: CollectionNames, id: string | number }) {

    const path = usePathname()

    const isActive = (value: string) => {
        return !!value ? path.includes(value) : path === `/admin/${ collection }/${ id }`
    }

    const getNavItemsByCollectionName = () => {
        const items = navItemsByCollectionName[collection]
        if (!items) throw new Error('No hay items de navegación para esta colección: ' + collection)

        return items
    }

    const getHref = (item: any) => {
        return !!item.association ? `/admin/${ collection }/${ id }/associate/${ item.value }` : `/admin/${ collection }/${ id }/${ item.value }`
    }

    return (
        <menu className="w-full flex flex-wrap gap-4 items-center pt-2 pb-4">
            { 
                getNavItemsByCollectionName().map((item, index) => 
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
