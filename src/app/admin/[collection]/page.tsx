import { Metadata } from "next";
import { IOneOfCollectionNames } from "@/types";
import { getCollection } from "@/app/_fetch/get";


export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

export default async function AdminElementPage({ params } : { params: { collection: IOneOfCollectionNames }}) {
    
    const { collection } = params

    const { data: items } = await getCollection(collection)

    return (
        <div>
            { JSON.stringify(items) }
        </div>
    )
}
