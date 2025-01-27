
import { getContestByDomain } from '@/lib/fetch/get/contests'
import InscriptionForm from '@/lib/forms/collection/components/InscriptionForm'
import React from 'react'

export default async function TestInscriptionsPage() {

    const { data: contest } = await getContestByDomain('battleofthebands-com')

    if (!contest) throw new Error('No contest found!')
    

    return (
        <section className='admin-page-content'>
            <header>
                <p>Gestionar inscripciones para</p>
                <h1>{ contest.name } ({ contest.year })</h1>
            </header>
            <hr className='my-4 max-w-xl'/>
            <InscriptionForm contestId={ contest.id } domain={ contest.domain }/>
        </section>
    )
}
