import { IContest } from '@/types'
import Link from 'next/link'
import React from 'react'
import { edit as Icon } from '../_layout/design/icons'

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
                contests.map((contest, index) => {
                    return (
                        <article   
                            className='p-4 bg-neutral-800 text-neutral-100 px-4 rounded-xl flex flex-col border border-transparent'
                            key={ `cts_${ index }`}
                        >
                            <header className='flex justify-between'>
                                <p className='text-xs'>{ contest.Brand?.name || 'Sin branding' } · { contest.year }</p>
                                <Link href={ `/admin/contests/${ contest.id }`}>
                                    <Icon/>
                                </Link>
                            </header>
                            <div className='font-semibold text-xl'>
                                <div>{ contest.name } </div>
                            </div>
                            <div className='flex gap-2 pt-2'>
                                <div className=' flex px-2 py-1 border border-neutral-100 rounded-lg '>LONGEST ICON</div>
                                <div className=' flex px-2 py-1 border border-neutral-100 rounded-lg '>LONG ICON</div>
                                <div className=' flex px-2 py-1 border border-neutral-100 rounded-lg '>ICON</div>
                                <div className=' flex px-2 py-1 border border-neutral-100 rounded-lg '>ICON</div>
                                <div className=' flex px-2 py-1 border border-neutral-100 rounded-lg '>ICON</div>
                            </div>
                        </article>
                    )
                })
            }
        </section>
    )
}
