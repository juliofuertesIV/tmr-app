'use client'

import { IBrand, IContest, IContestMedia, IContestState, IOneOfCollectionNames, IOneOfCollections, IParam } from "@/interfaces"
import { useState } from "react"
import AdminEditionForm from "../../_forms/AdminEditionForm"
import ContestBrands from "./ContestBrands"
import ContestParams from "./ContestParams"
import ContestStates from "./ContestStates"
import ContestPanelNav from "./ContestPanelNav"
import { getEditionFormByCollectionName } from "../../_forms"
import { IEditionFormField, IFormEditionAction } from "@/interfaces/forms"

type Props = { 
    contest: IContest,
    relationships: {
        brands: IBrand[],
        params: IParam[],
        states: IContestState[]
    }
}

export type IContestSectionName = 'info' | 'params' | 'brands' | 'states' | 'media'

const navItems : { name: string, value: IContestSectionName }[] = [
    { name: 'Información', value: 'info' },
    { name: 'Marcas', value: 'brands' },
    { name: 'Estado', value: 'states' },
    { name: 'Configuración', value: 'params' },
    { name: 'Imágenes', value: 'media' },
]

export default function ContestPanel({ contest, relationships } : Props) {

    const { action, fields } = getEditionFormByCollectionName({ collection: 'contests' })

    const [ selectedSection, setSelectedSection ] = useState<IContestSectionName>('info')

    const onSelectNavItem = (section: IContestSectionName) => setSelectedSection(section)   

    const { brands, params, states } = relationships

    const panelSections : { [key in IContestSectionName]: { Element: () => JSX.Element } } = {
        info: { Element: () => <AdminEditionForm action={ action } fields={ fields } collection="contests" collectionElement={ contest as IOneOfCollections  }/> },
        brands: { Element: () => <ContestBrands items={ brands } collectionElement={ contest }/> },
        params: { Element: () => <ContestParams items={ params } collectionElement={ contest }/> },
        states: { Element: () => <ContestStates items={ states } collectionElement={ contest }/> },
        media: { Element: () => <div></div> }
    }

    const { Element } = panelSections[selectedSection]

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
