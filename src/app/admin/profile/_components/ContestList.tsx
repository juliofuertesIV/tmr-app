import { IContest, IManager } from '@/types'
import Link from 'next/link'
import React from 'react'

export default function ContestList({ manager } : { manager: IManager }) {

    const contests = manager.Contests

    if (manager.RoleId > 3) return (
        <div className='mt-8'>
            <header>
                <h2>Concursos:</h2>
            </header>
            Eres un admin. Tienes todos los concursos a tu disposición: <Link className='font-semibold underline' replace={ false } href={ '/admin' }>ver concursos.</Link>
        </div>
    )

    return (
        <div>
            <header>
                <h2>Concursos:</h2>
            </header>
            {
                contests?.map((contest, index) => {
                    return (
                        <p key={ index }>{ contest.name }</p>
                    )
                })
            }
        
        </div>
    )
}
