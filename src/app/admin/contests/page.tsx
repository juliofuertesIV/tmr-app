import { getContests } from '@/lib/fetch/get/contests'
import React from 'react'
import ContestGrid from '../_dashboard/ContestGrid'

export default async function ContestsPage() {

    const { data: contests } = await getContests()

    if (contests == null) throw new Error('No contests.')

    return (
        <section className='admin-page-content'>
            <h1>Concursos</h1>
            <ContestGrid contests={ contests }/>
        </section>
    )
}
