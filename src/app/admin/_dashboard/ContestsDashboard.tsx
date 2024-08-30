'use client'

import { IContest } from '@/types'
import { useState } from 'react'
import DashboardNav from './DashboardNav'
import ContestGrid from './ContestGrid'
import ContestCreation from './ContestCreation'

export default function ContestsDashboard({ contests } : { contests: IContest[] }) {

    const [ view, setView ] = useState<string>('active')

    const onViewChange = (view: string) => setView(view)

    const contestIsActive = (contest: IContest) => 
        contest.StateId === 'inscriptionOnly' || contest.StateId ==='open' || contest.StateId === 'endedInscription' 
    
    const activeContests = contests.filter(contest => contestIsActive(contest)) 
    const inactiveContests = contests.filter(contest => !contestIsActive(contest)) 
    const filteredContests = view === 'active' ? activeContests : inactiveContests

    return (
        <section className="w-full grid gap-4 max-w-6xl mx-auto px-4">
            <header className='pl-4 pb-4 col-span-2'>
                <h1 className='pb-4'>CONCURSOS</h1>
                <DashboardNav onViewChange={ onViewChange } currentView={ view }/>
            </header>
            <div className='col-span-2 rounded-md w-full min-h-40'>
                {
                    view === 'crear' ? 
                    <ContestCreation/> : <ContestGrid contests={ filteredContests }/>
                }
            </div>
        </section>
    ) 
}
