'use client'

import { IBrand, IContestMedia, IContestState, IOneOfCollectionNames, IOneOfCollections, IParam } from "@/interfaces"
import { ICollectionPanel } from "@/interfaces/forms"
import CollectionPanelNav from "./nav/CollectionPanelNav"
import { useState } from "react"
import AdminEditionForm from "../../_forms/AdminEditionForm"

type Props = { 
    collection: IOneOfCollectionNames,
    collectionElement: IOneOfCollections,
    panel: ICollectionPanel,
    items: {
        [key: string]: IParam[] | IBrand[] | IContestState[] | IContestMedia[]
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
                !CurrentSection ?
                (<AdminEditionForm 
                    collection={ collection }
                    collectionElement={ collectionElement }
                    action={ action }
                    fields={ fields }
                />)
                : 
                (
                    <CurrentSection
                    collectionElement={ collectionElement }
                    items={ currentItems } 
                />)
            }
            </section>
        </div>
    )
}
