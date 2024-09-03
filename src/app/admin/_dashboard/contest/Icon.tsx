import { IContest } from '@/types'
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

export type IContestIconRole = 'stats' | 'open' | 'visible' | 'verify' | 'contestants' | 'inscription'

const getContentByRole = (role: IContestIconRole, contest: IContest) => {
    const iconByRole = {
        stats: (contest: IContest) => { 
            return { 
                Icon: StatsIcon,
                data: contest.Inscriptions.length,
                className: '',
            }
        },
        contestants: (contest: IContest) => { 
            return { 
                Icon: ContestantsIcon,
                data: contest.Inscriptions.length,
                className: '',
            }
        },
        verify: (contest: IContest) => { 
            return { 
                Icon: VerifyIcon,
                data: contest.Inscriptions.filter(inscription => inscription.verified === false).length || null,
                className: contest.Inscriptions.filter(inscription => inscription.verified === false).length ? '' : 'neutral-400',
            }
        },
        open: (contest: IContest) => { 
            return { 
                Icon: contest.StateId === 'ended' ? ClosedIcon : OpenIcon,
                data: null,
                className: contest.StateId === 'ended' || contest.StateId === 'hidden' ? 'red-800' : 'green-500',
            }
        },
        visible: (contest: IContest) => { 
            return { 
                Icon: contest.StateId === 'hidden' ? Hiddenicon : VisibleIcon,
                data: null,
                className: contest.StateId === 'hidden' ? 'neutral-400' : 'green-500',
            }
        },
        inscription: (contest: IContest) => { 
            return { 
                Icon: contest.StateId === 'endedInscription' || contest.StateId === 'hidden' ? ClosedInscriptionsIcon : OpenInscriptionsIcon, 
                data: null,
                className: contest.StateId === 'endedInscription' || contest.StateId === 'hidden' ? 'red-800' : 'green-500', 
            }
        }
    }

    return iconByRole[role](contest)
}


export default function Icon({ role, contest } : { role: IContestIconRole, contest: IContest }) {

    const { Icon, data, className } = getContentByRole(role, contest)

    console.log({ Icon, data: data != null })

    return (
        <div className={ 'flex gap-2 justify-between items-center px-2 py-1 border border-neutral-100 rounded-lg ' + `text-${ className }` } >
            <Icon/>
            {
                (data != null) && <p>{ data }</p>    
            }
        </div>
    )
}
