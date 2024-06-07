'use client'

import { ICollectionNames } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItemsByCollectionName = {
    contests: [
        { name: 'Información', value: '', association: false },
        { name: 'Branding', value: 'brand', association: false },
        { name: 'Footer', value: 'media', association: true },
        { name: 'Redes sociales', value: 'social', association: true },
        { name: 'Géneros', value: 'genres', association: true },
        { name: 'Configuración', value: 'params', association: true },
        { name: 'Estado', value: 'state', association: false },
    ],
    brands: [
        { name: 'Información', value: '', association: false },
    ],
    social: [
        { name: 'Información', value: '', association: false },
    ],
    genres: [
        { name: 'Información', value: '', association: false },
    ],
    managers: [
        { name: 'Información', value: '', association: false },
        { name: 'Rol', value: 'role', association: false },
    ],
    inscriptions: [
        { name: 'Información', value: '', association: false },
    ]
} as {
    [key in ICollectionNames]: { name: string, value: string, association: boolean }[]
}

export default function CollectionItemNav({ collection, id } : { collection: ICollectionNames, id: string | number }) {

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
        return !!item.association ? `/admin/${ collection }/${ id }/manage/${ item.value }` : `/admin/${ collection }/${ id }/${ item.value }`
    }

    return (
        <header className=" pt-3 pb-4 mx-auto mb-8 w-full">
            <ul className="w-full flex flex-wrap gap-2 px-4 items-center justify-center">
                { 
                    getNavItemsByCollectionName().map((item, index) => 
                        <Link
                            className="bg-neutral-800 px-4 py-1 rounded-sm w-fit text-center data-[active='true']:bg-neutral-500 data-[active='true']:text-neutral-50 data-[active='true']:pointer-events-none hover:bg-neutral-600 uppercase text-sm"
                            href={ getHref(item) }
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
