
import { getContestByDomain } from '@/lib/fetch/get/contests'
import Link from 'next/link'
import React from 'react'

export default async function TestInscriptionsPage() {

    const { data: contest } = await getContestByDomain('contest-battleofthebands')

    if (!contest) throw new Error('No contest found!')
    

    return (
        <section className='admin-page-content'>
            <header>
                <p>Ver inscripciones de</p>
                <h1>{ contest.name } ({ contest.year })</h1>
            </header>
            <hr className='my-4 max-w-xl'/>
            <div className='flex flex-col gap-2'>
            {
                contest.Inscriptions.map((inscription, index) => {
                    return (
                        <Link 
                            key={ index }
                            replace={ false }
                            href={ `inscriptions/${ inscription.id }`}
                            className='px-4 py-2 border-2 border-neutral-200 max-w-xl hover:bg-neutral-800 cursor-pointer'
                        >
                            <header>
                                <h2>{ inscription.name }</h2>
                                <h3>{ inscription.genre } de { inscription.city } </h3>
                            </header>
                        </Link>
                    )
                })
            }
            </div>
        </section>
    )
}
