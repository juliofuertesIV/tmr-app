import { ICollectionNames } from "@/types";
import CollectionItemNav from "./_layout/CollectionItemNav";

type Props = {
    params: {
        collection: ICollectionNames,
        id: string
    },
    children: React.ReactNode
}

export default function Layout({ params, children } : Props) {

    const { collection, id } = params

    return (
        <div className="h-screen flex flex-col w-full relative bg-neutral-950 overflow-hidden">
            <CollectionItemNav collection={ collection } id={ id }/>
            <div className="bg-neutral-950 flex flex-col justify-start items-center w-full min-h-fit overflow-y-scroll pb-12">
                { children }
            </div>
        </div>
    )
}
