import { IContest } from '@/types'
import React from 'react'
import { 
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
                toolTip: '???'
            }
        },
        contestants: (contest: IContest) => { 
            return { 
                Icon: ContestantsIcon,
                data: contest.Inscriptions.length,
                className: '',
                toolTip: 'Número de inscripciones'
            }
        },
        verify: (contest: IContest) => { 
            return { 
                Icon: VerifyIcon,
                data: contest.Inscriptions.filter(inscription => inscription.verified === false).length || null,
                className: contest.Inscriptions.filter(inscription => inscription.verified === false).length ? '' : 'neutral-400',
                toolTip: contest.Inscriptions.filter(inscription => inscription.verified === false).length ? 'Participantes por verificar' : 'Nadie por verificar'
            }
        },
        open: (contest: IContest) => { 
            return { 
                Icon: contest.StateId === 'ended' ? ClosedIcon : OpenIcon,
                data: null,
                className: contest.StateId === 'ended' || contest.StateId === 'hidden' ? 'red-800' : 'green-500',
                toolTip: contest.StateId === 'ended' || contest.StateId === 'hidden' ? 'Cerrado' : 'Abierto'
            }
        },
        visible: (contest: IContest) => { 
            return { 
                Icon: contest.StateId === 'hidden' ? Hiddenicon : VisibleIcon,
                data: null,
                className: contest.StateId === 'hidden' ? 'neutral-400' : 'green-500',
                toolTip: contest.StateId === 'hidden' ? 'Oculto' : 'Visible'
            }
        },
        inscription: (contest: IContest) => { 
            return { 
                Icon: contest.StateId === 'endedInscription' || contest.StateId === 'hidden' ? ClosedInscriptionsIcon : OpenInscriptionsIcon, 
                data: null,
                className: contest.StateId === 'endedInscription' || contest.StateId === 'hidden' ? 'red-800' : 'green-500', 
                toolTip: contest.StateId === 'endedInscription' || contest.StateId === 'hidden' ? 'Inscripción cerrada' : 'Inscripción abierta'
            }
        }
    }

    return iconByRole[role](contest)
}


export default function Icon({ role, contest } : { role: IContestIconRole, contest: IContest }) {

    const { Icon, data, className, toolTip } = getContentByRole(role, contest)

    return (
        <div className={ 'relative group flex gap-2 justify-between items-center px-2 py-1 border border-neutral-100 rounded-lg ' + `text-${ className }` } >
            <div className='opacity-0 group-hover:opacity-100 bg-neutral-100 text-neutral-900 text-xs px-4 py-2 absolute -bottom-10 -right-2] pointer-events-none rounded-md transition-opacity z-20 flex whitespace-nowrap'>
                <p>{ toolTip }</p>
            </div>
            <Icon/>
            {
                (data != null) && <p>{ data }</p>    
            }
        </div>
    )
}
