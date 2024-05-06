import { IContest } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

export default function ContestGridItem({ item } : { item: IContest }) {
    return (
        <div 
            className="flex flex-1 gap-8 text-white border-white bg-neutral-800 border pl-4 px-2 py-2 rounded-md w-full"
            style={{
                backgroundColor: item.Brand?.backgroundColor || '',
                color: item.Brand?.foregroundColor || ''
            }}
        >
            <div className="flex flex-col justify-center flex-1 gap-1">
                <header className="uppercase text-left font-bold leading-none">
                    { item.name } ({`${ item.Brand?.name || "No branding"}, ${ item.year }`})
                </header>
                <div className="uppercase font-bold opacity-70 leading-none">
                    <small>ESTADO: { item.State.name }</small>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-2 text-center text-xs">
                <Link
                    className="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm font-bold leading-none hover:bg-neutral-50"
                    href={ `/admin/contests/${item.id}` }
                >
                    MANAGE
                </Link>
                <Link 
                    className="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm font-bold leading-none hover:bg-neutral-50 pointer-events-none opacity-50"
                    href={ `/admin/contests/${item.id}/stats` }
                >
                    STATS
                </Link>
            </div>
        </div>   
    )
}
