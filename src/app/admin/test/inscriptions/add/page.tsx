
import { getContestByDomain } from '@/lib/fetch/get/contests'
import React from 'react'
import InscriptionCreationModule from '../_components/InscriptionCreationModule'

const getContest = async () => {

    const { data: contest } = await getContestByDomain('battleofthebands.com')

    return contest

}

export default async function TestAddInscriptionsPage() {

    const contest = await getContest()
    
    if (!contest) return null    

    return (
        <section className='admin-page-content'>
            <header>
                <p>Gestionar inscripciones para</p>
                <h1>{ contest.name } ({ contest.year })</h1>
            </header>
            <hr className='my-4 max-w-xl'/>
            <InscriptionCreationModule contest={ contest }/>
        </section>
    )
}
