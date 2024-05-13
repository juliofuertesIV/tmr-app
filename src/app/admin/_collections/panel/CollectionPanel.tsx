'use client'

import { IOneOfCollectionNames } from "@/interfaces"
import { getCollectionPanel } from ".."

type Props = { 
    collection: IOneOfCollectionNames
}

export default function CollectionPanel({ collection } : Props) {

    const { sections } = getCollectionPanel({ collection })

    return (
        <div className="h-screen flex flex-col w-full relative">
            <header className=" bg-neutral-900">
                
            </header>
            {
                sections.map((section, index) => {
                    return (
                        <section 
                            key={ index }
                            className="grid place-items-center flex-1 pt-4"
                        >
                        </section>
                    )
                })
            }
        </div>
    )
}
