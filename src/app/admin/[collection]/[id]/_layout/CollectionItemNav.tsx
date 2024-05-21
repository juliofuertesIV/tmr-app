'use client'

import { IOneOfCollectionNames } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItemsByCollectionName = {
    contests: [
        { name: 'Información', value: '' },
        { name: 'Configuración', value: 'params' },
        { name: 'Branding', value: 'brands' },
        { name: 'Géneros', value: 'genres' },
        { name: 'Redes sociales', value: 'social' },
        { name: 'Imágenes', value: 'media' },
        { name: 'Estado', value: 'states' },
    ],
    brands: [
        { name: 'Información', value: '' },
    ],
    social: [
        { name: 'Información', value: '' },
    ],
    genres: [
        { name: 'Información', value: '' },
    ],
    managers: [
        { name: 'Información', value: '' },
    ],
    inscriptions: [
        { name: 'Información', value: '' },
    ]
} as {
    [key in IOneOfCollectionNames]: { name: string, value: string }[]
}

export default function CollectionItemNav({ collection, id } : { collection: IOneOfCollectionNames, id: string | number }) {

    const path = usePathname()

    const isActive = (value: string) => {
        return !!value ?
        path === `/admin/${ collection }/${ id }/${ value }`
        : path === `/admin/${ collection }/${ id }`
    }

    const getNavItemsByCollectionName = () => {
        const items = navItemsByCollectionName[collection]
        if (!items) throw new Error('No hay items de navegación para esta colección: ' + collection)

        return items
    }

    return (
        <header className=" pt-3 pb-4 mx-auto mb-8 w-full">
            <ul className="w-full flex flex-wrap gap-2 px-4 items-center justify-center">
                { 
                    getNavItemsByCollectionName().map((item, index) => 
                        <Link
                            className="bg-neutral-800 px-4 py-1 rounded-sm w-fit text-center data-[active='true']:bg-neutral-500 data-[active='true']:text-neutral-50 data-[active='true']:pointer-events-none hover:bg-neutral-600 uppercase text-sm"
                            href={ `/admin/${ collection }/${ id }/${ item.value }` }
                            key={ index }
                            data-active={ isActive(item.value) }
                        >
                            <li>{ item.name }</li>
                        </Link>
                    ) 
                }
            </ul>
        </header>
    )
}
