'use client'

import { IOneOfCollectionNames, IOneOfCollections } from "@/interfaces"
import { useState } from "react"
import CollectionPanelNav from "./nav/CollectionPanelNav"
import { getCollectionItemPanelByCollectionName } from ".."

type Props = { 
    collection: IOneOfCollectionNames,
    item: IOneOfCollections
}

export default function CollectionItemPanel({ collection, item } : Props) {

    const [ selectedSection, setSelectedSection ] = useState<string>('info')

    const onSelectNavItem = (section: string) => setSelectedSection(section)      

    const { navItems, sections } = getCollectionItemPanelByCollectionName({ collection })
    
    const { Element } = sections[selectedSection]

    return (
        <div className="h-screen flex flex-col w-full relative">
            <header className=" bg-neutral-900">
                <h1 className="text-center uppercase my-4">{ item.name }</h1>
                <CollectionPanelNav navItems={ navItems } currentSection={ selectedSection } onSelectNavItem={ onSelectNavItem }/>
            </header>
            <section className="grid place-items-center flex-1 pt-4 ">
                <Element item={ item }/>
            </section>
        </div>
    )
}
