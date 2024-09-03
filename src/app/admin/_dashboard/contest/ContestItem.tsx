import { IContest } from '@/types'
import Link from 'next/link'
import React from 'react'
import { 
    edit as EditIcon,
    stats as StatsIcon,
    openContest as OpenIcon,
    closedContest as ClosedIcon,
    visible as VisibleIcon,
    hidden as Hiddenicon,
    verify as VerifyIcon,
    contestants as ContestantsIcon,
    openInscription as OpenInscriptionsIcon,
    closedInscription as ClosedInscriptionsIcon
} from '../../_layout/design/icons'
import Icon, { IContestIconRole } from './Icon'

export default function ContestItem({ contest } : { contest: IContest }) {

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
            className='p-4 bg-neutral-800 text-neutral-100 px-4 rounded-xl flex flex-col border border-transparent'
        >
            <header className='flex justify-between'>
                <p className='text-xs'>{ contest.Brand?.name || 'Sin branding' } · { contest.year }</p>
                <Link href={ `/admin/contests/${ contest.id }`}>
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
