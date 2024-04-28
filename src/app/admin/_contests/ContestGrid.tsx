import { IContest } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

export default function ContestGrid({ contests } : { contests: IContest[] }) {
    return (
        <div className="flex flex-col gap-2 justify-start w-full">
        {
            contests.map((contest: IContest, index: number) => {
                return (
                    <div 
                        key={ index } 
                        className="flex gap-8 text-white border-white bg-neutral-800 border pl-4 px-2 py-2 rounded-md w-full"
                        style={{
                            backgroundColor: contest.Brand?.backgroundColor || '',
                            color: contest.Brand?.foregroundColor || ''
                        }}
                    >
                        <div className="flex flex-col justify-center flex-1">
                            <header className="uppercase text-left font-bold leading-none">
                                { contest.name } ({`${ contest.Brand?.name || "No branding"}, ${ contest.year }`})
                            </header>
                            <div className="opacity-70 pb-1">
                                <small>{ contest.metaUrl }</small>
                            </div>
                            <div className="uppercase font-bold opacity-70 leading-none">
                                <small>ESTADO: { contest.State.name }</small>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-2 text-center text-xs">
                            <Link 
                                className="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm font-bold leading-none hover:bg-neutral-50"
                                href={ `/admin/contests/${contest.id}` }
                            >
                                MANAGE
                            </Link>
                            <Link 
                                className="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm font-bold leading-none hover:bg-neutral-50 pointer-events-none opacity-50"
                                href={ `/admin/contests/${contest.id}/stats` }
                            >
                                STATS
                            </Link>
                        </div>
                    </div>
                )
            })
        }
        </div>

    )
}
