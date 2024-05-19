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
    social: []
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

    return (
        <header className="bg-neutral-900 pt-3 pb-4 mx-auto mb-8 w-full">
            <ul className="w-full flex gap-2 px-4 items-center justify-center">
                { 
                    navItemsByCollectionName[collection].map((item, index) => 
                        <Link
                            className="bg-neutral-800 px-4 py-1 rounded-sm w-fit text-center data-[active='true']:bg-neutral-500 data-[active='true']:text-neutral-50 data-[active='true']:pointer-events-none hover:bg-neutral-600"
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
