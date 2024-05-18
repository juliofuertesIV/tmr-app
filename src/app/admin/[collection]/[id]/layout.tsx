import { IOneOfCollectionNames } from "@/interfaces";
import Link from "next/link";

const navItemsByCollectionName = {
    contests: [
        { name: 'Información', value: '' },
        { name: 'Configuración', value: 'params' },
        { name: 'Branding', value: 'brands' },
        { name: 'Géneros', value: 'genres' },
        { name: 'Redes sociales', value: 'social' },
        { name: 'Imágenes', value: '' },
        { name: 'Footer', value: '' },
        { name: 'Estado', value: 'states' },
    ],
    brands: [
        { name: 'Información', value: '' },
    ]
}

type Props = {
    params: {
        collection: IOneOfCollectionNames,
        id: string
    },
    children: React.ReactNode
}

export default function Layout({ params, children } : Props) {

    const { collection, id } = params

    const navItems = navItemsByCollectionName[collection]

    return (
        <div className="h-screen flex flex-col w-full relative bg-neutral-950">
            <header className="flex items-center justify-center bg-neutral-900 pt-3 pb-4 border-2 border-t-0 border-neutral-400 rounded-b-sm w-full max-w-[95%] mx-auto mb-8">
                <ul className="w-full flex gap-2 px-4 items-center">
                    { 
                        navItems.map((item, index) => 
                            <Link 
                                className="flex-1 bg-neutral-800 px-4 py-1 rounded-sm w-full min-w-fit text-center"
                                href={ `/admin/${ collection }/${ id }/${ item.value }` }
                                key={ index }
                            >
                                <li>{ item.name }</li>
                            </Link>
                        ) 
                    }
                </ul>
            </header>
            <div className="bg-neutral-950 flex flex-col justify-start items-center w-full">
                { children }
            </div>
        </div>
    )
}
