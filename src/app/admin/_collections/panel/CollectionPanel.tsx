'use client'

import { IOneOfCollectionNames, IOneOfCollections } from "@/interfaces"
import { useState } from "react"
import CollectionPanelNav from "./nav/CollectionPanelNav"
import { getCollectionElementPanel } from ".."

type Props = { 
    collection: IOneOfCollectionNames,
    item: IOneOfCollections
}

export default function CollectionPanel({ collection, item } : Props) {

    const [ selectedSection, setSelectedSection ] = useState<string>('info')

    const onSelectNavItem = (section: string) => setSelectedSection(section)      

    const { navItems, sections } = getCollectionElementPanel({ collection })
    
    const { Element } = sections[selectedSection]

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex flex-col items-center justify-center py-8 pb-6 bg-neutral-900">
                <h1 className="leading-none mb-4">Editando { item.name }</h1>
                <CollectionPanelNav navItems={ navItems } currentSection={ selectedSection } onSelectNavItem={ onSelectNavItem }/>
            </header>
            <section className="grid place-items-center flex-1 pt-4">
                <Element item={ item }/>
            </section>
        </div>
    )
}
