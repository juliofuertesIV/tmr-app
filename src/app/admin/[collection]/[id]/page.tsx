import { Metadata } from "next";
import { IBrand, IContestState, IOneOfCollectionNames, IParam } from "@/interfaces";
import { getPanelByCollectionName } from "../../_forms";
import { getCollectionElementById } from "@/app/_fetch/get";
import CollectionPanel from "../../_collections/panel/CollectionPanel";
import { Brand, Param, State } from "@/database";

export const metadata: Metadata = {
    title: "Panel de administración TMR",
    description: "El buen admin panel"
};

const getData = async () : Promise<{ states: IContestState[], brands: IBrand[], params: IParam[] }> => {
    const states = await State.findAll().then(data => data) as unknown as IContestState[]
    const brands = await Brand.findAll().then(data => data) as unknown as IBrand[]
    const params = await Param.findAll().then(data => data) as unknown as IParam[]
    
    return { 
        states: JSON.parse(JSON.stringify(states)),
        brands: JSON.parse(JSON.stringify(brands)), 
        params: JSON.parse(JSON.stringify(params))
    }
}

export default async function AdminElementPage({ params } : { params: { collection: IOneOfCollectionNames, id: string }}) {
    
    const { collection, id } = params

    const { data: collectionElement } = await getCollectionElementById(collection, id)

    const items = await getData()

    const panel = getPanelByCollectionName({ collection })

    return (
        <main className="flex min-h-screen flex-col">
            <CollectionPanel collection={ collection } panel={ panel } collectionElement={ collectionElement } items={ items }/>
        </main>
    )
}
