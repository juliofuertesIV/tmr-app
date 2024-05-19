import { Metadata } from "next";
import { IOneOfCollectionNames, IOneOfCollections } from "@/types";
import { getCollection } from "@/app/_fetch/get";
import Link from "next/link";
import { ArrowRightIcon } from "../_layout/_design/icons/ArrowRightIcon";


export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: IOneOfCollectionNames }}) {
    
    const { collection } = params

    const { data: items } = await getCollection(collection) as { data: IOneOfCollections[] }

    if (!items) return (
        <div className="grid place-items-center w-full min-h-screen">
            No hay elementos en esta categoría.
        </div>
    )

    return (
        <div className="grid place-items-center w-full min-h-screen">
            <div className="flex flex-col gap-2 w-full max-w-2xl">
            {
                items.map((item, index) => {
                    return (
                        <Link 
                            className="bg-neutral-300 text-neutral-800 w-full px-4 py-1 uppercase flex justify-between items-center hover:bg-neutral-50 hover.text-neutral-950 border-2 border-transparent hover:border-green-600"
                            key={ index }
                            href={ `${ collection }/${ item.id }`}
                        >
                            <p>
                                { item.name }
                            </p>
                            <ArrowRightIcon className="max-w-6 text-xl"/>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}
