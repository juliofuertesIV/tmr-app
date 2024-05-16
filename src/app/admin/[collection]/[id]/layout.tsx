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
        <div className="h-screen flex flex-col w-full relative">
            <header className="bg-neutral-900">
                <h1 className="text-center uppercase my-4">TEST</h1>
                <ul className="flex gap-2">
                    { 
                        navItems.map((item, index) => 
                            <Link 
                                href={ `/admin/${ collection }/${ id }/${ item.value }` }
                                key={ index }
                            >
                                <li>{ item.name }</li>
                            </Link>
                        ) 
                    }
                </ul>
            </header>
            { children }
        </div>
    )
}
