'use client'

import { ICollectionNames } from "@/types"
import { IAssociationNames, IContestRelationshipNames } from "@/types/associations"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItemsByCollectionName = {
    contests: [
        { name: 'Información', value: '', association: false },
        { name: 'Branding', value: 'brand', association: false },
        { name: 'Redes sociales', value: 'social', association: true },
        { name: 'Géneros', value: 'genres', association: true },
        { name: 'Configuración', value: 'params', association: true },
        { name: 'Imágenes', value: 'media', association: true },
        { name: 'Sponsors', value: 'sponsors', association: true },
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
    ],
    sponsors: [
        { name: 'Información', value: '', association: false },
        { name: 'Imágenes', value: 'media', association: false },
    ]
} as {
    [key in ICollectionNames]: { name: string, value: IContestRelationshipNames | IAssociationNames | '', association: boolean }[]
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
