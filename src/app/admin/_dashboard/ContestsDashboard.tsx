'use client'

import { useState } from 'react'
import DashboardNav from './DashboardNav'
import ContestGrid from './ContestGrid'
import React, { Suspense } from 'react';
import { IContest } from '@/types/contests';

// Dynamically import the ContestCreation component
const ContestCreation = React.lazy(() => import('./ContestCreation'));

export default function ContestsDashboard({ contests } : { contests: IContest[] }) {

    const [ view, setView ] = useState<string>('active')

    const onViewChange = (view: string) => setView(view)

    const contestIsActive = (contest: IContest) => 
        contest.StateId === 'inscriptionOnly' || contest.StateId ==='open' || contest.StateId === 'endedInscription' 
    
    const activeContests = contests?.filter(contest => contestIsActive(contest))
    const inactiveContests = contests?.filter(contest => !contestIsActive(contest)) 
    const filteredContests = view === 'active' ? activeContests : inactiveContests

    return (
        <section className="admin-page-content">
            <header className='pl-4 pb-4 col-span-2'>
                <h1 className='pb-4'>CONCURSOS</h1>
                <DashboardNav onViewChange={ onViewChange } currentView={ view }/>
            </header>
            <div className='flex flex-wrap'>
                <div className='rounded-md w-full max-w-fit min-h-40'>
                    {
                        view === 'crear' ? <ContestCreation/> : <ContestGrid contests={ filteredContests }/>
                    }
                </div>
            </div>
        </section>
    ) 
}
