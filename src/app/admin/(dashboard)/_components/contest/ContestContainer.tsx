
import Link from 'next/link'
import React from 'react'
import Icon, { IContestIconRole } from './Icon'
import { IContest } from '@/types/contests'
import { EditIcon } from '@/app/admin/_layout/design/icons/components/Edit'

export default function ContestContainer({ contest } : { contest: IContest }) {

    const contestIcons : { role: IContestIconRole }[] = [
        { role: 'stats' },
        { role: 'contestants' },
        { role: 'verify' },
        { role: 'open' },
        { role: 'visible' },
        { role: 'inscription' },
    ]

    return (
        <article   
            className='p-4 bg-neutral-800 text-neutral-100 px-4 rounded-xl flex flex-col border-transparent border-2 hover:border-green-600 transition-colors'
        >
            <header className='flex justify-between'>
                <p className='text-xs'>{ contest.Brand?.name || 'Sin branding' } · { contest.year }</p>
                <Link href={ `/admin/contests/${ contest.id }`} className='hover:text-green-400'>
                    <EditIcon/>
                </Link>
            </header>
            <div className='font-semibold text-xl'>
                <div>{ contest.name } </div>
            </div>
            <div className='flex gap-2 pt-2'>
                {
                    contestIcons.map((icon, index) => {
                        return (
                            <Icon key={ `${ contest.id }-${index}` } contest={ contest } role={ icon.role }/>
                        )
                    })

                }

            </div>
        </article>
    )
}
