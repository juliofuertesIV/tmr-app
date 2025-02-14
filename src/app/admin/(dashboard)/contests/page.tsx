import React from 'react'
import ContestGrid from '../_components/ContestGrid'
import { getAllContestsFromDatabase } from '@/lib/database/functions/contests'

const getContestsPageData = async () => {
    const contests = await getAllContestsFromDatabase({ scope: 'basic' })
    
    return JSON.parse(JSON.stringify(contests))
}

export default async function ContestsPage() {

    const contests = await getContestsPageData()
    
    return (
        <section className='admin-page-content'>
            <h1>Concursos</h1>
            <ContestGrid contests={ contests }/>
        </section>
    )
}
