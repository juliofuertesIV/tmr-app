import { IContest } from '@/types'
import React from 'react'
import ContestContainer from './contest/ContestContainer'

export default function ContestGrid({ contests } : { contests: IContest[] }) {

    if (!contests || !contests.length) {
        return (
            <section className='w-full grid gap-4 p-4 lg:grid-cols-2'>
                <h2>No hay concursos por el momento.</h2>
            </section>    
        )
    }

    return (
        <section className='w-full grid gap-4 p-4 lg:grid-cols-2'>
            {
                contests.map((contest, index) => 
                    <ContestContainer key={ index } contest={ contest }/>
                )
            }
        </section>
    )
}
