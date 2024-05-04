'use client'

import { IOneOfCollectionNames, IOneOfCollections } from "@/interfaces"
import { ICollectionPanel, IContestRelations } from "@/interfaces/forms"
import CollectionPanelNav from "./nav/CollectionPanelNav"
import { useState } from "react"
import AdminEditionForm from "../../_forms/AdminEditionForm"

type Props = { 
    collection: IOneOfCollectionNames,
    collectionElement: IOneOfCollections,
    panel: ICollectionPanel,
    items: {
        [key: string]: IContestRelations[]
    }
}

export default function CollectionPanel({ collection, collectionElement, panel, items } : Props) {

    const { navItems, form, sections } = panel

    const { action, fields } = form

    const [ selectedSection, setSelectedSection ] = useState<string | null>(null)

    const currentItems = !!selectedSection ? items[selectedSection as string] : []

    const onSelectNavItem = (section: string | null) => setSelectedSection(section)   
    
    const CurrentSection = selectedSection ? sections[selectedSection] : null

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex flex-col items-center justify-center py-8 pb-6 bg-neutral-900">
                <h1 className="leading-none mb-4">Editando { collectionElement.name }</h1>
                <CollectionPanelNav navItems={ navItems } currentSection={ selectedSection } onSelectNavItem={ onSelectNavItem }/>
            </header>
        <section className=" grid place-items-center flex-1">
            {
                !!CurrentSection ?
                <CurrentSection collectionElement={ collectionElement } items={ currentItems } />
                : 
                <AdminEditionForm collection={ collection } collectionElement={ collectionElement } action={ action } fields={ fields }/>
            }
        </section>
        </div>
    )
}
