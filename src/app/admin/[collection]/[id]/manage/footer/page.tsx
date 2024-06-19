import { getCollectionElementById } from '@/lib/fetch/get'
import React from 'react'
import FooterManager from './_components/FooterManager'

type Props = {
    params: { id: string }
}

export default async function FooterPage({ params } : Props) {

    const { id } = params

    const { data: item } = await getCollectionElementById('contests', id)

    if (!item) throw new Error('No se ha encontrado el concurso')

    return (
        <section className="w-full flex flex-col items-center">
            <header className="text-center max-w-2xl mb-8">
                <h1 className="mb-4 uppercase">Elementos de footer de { item.name }</h1>
                <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nemo quidem sunt aliquid sequi quisquam, corporis sapiente aperiam nulla cupiditate, libero suscipit inventore vel! Dolor, id? Minima autem eaque animi quas amet fugiat cum velit cumque culpa facere est maxime magni, soluta commodi possimus temporibus eius, sed earum explicabo eum!</p>
            </header>
            <FooterManager contest={ item }/>
        </section>
    )
}
