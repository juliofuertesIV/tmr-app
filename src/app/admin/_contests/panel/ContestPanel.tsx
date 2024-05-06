'use client'

import { IBrand, IContest, IContestState, IOneOfCollections, IParam } from "@/interfaces"
import { useState } from "react"
import ContestPanelNav from "./ContestPanelNav"
import { getCollectionElementPanel } from "../../_collections/panel"

type Props = { 
    contest: IContest,
    relationships: {
        brands: IBrand[],
        params: IParam[],
        states: IContestState[]
    }
}

export default function ContestPanel({ contest } : Props) {

    const [ selectedSection, setSelectedSection ] = useState<string>('info')

    const onSelectNavItem = (section: string) => setSelectedSection(section)   
    
    const { navItems, sections } = getCollectionElementPanel({ collection: 'contests', collectionElement: contest as IOneOfCollections })
    
    const { Element } = sections[selectedSection]

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex flex-col items-center justify-center py-8 pb-6 bg-neutral-900">
                <h1 className="leading-none mb-4">Editando { contest.name }</h1>
                <ContestPanelNav navItems={ navItems } currentSection={ selectedSection } onSelectNavItem={ onSelectNavItem }/>
            </header>
        <section className="grid place-items-center flex-1">
            <Element/>
        </section>
        </div>
    )
}
