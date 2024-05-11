import { IContest } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

export default function ContestGridItem({ item } : { item: IContest }) {
    return (
        <Link
            className='flex w-full items-center'
            href={ `/admin/contests/${item.id}` }
        >
            <div 
                className="flex gap-4 text-white border-white bg-neutral-800 border pl-4 px-2 py-2 rounded-md w-full"
                style={{
                    backgroundColor: item.Brand?.backgroundColor || '',
                    color: item.Brand?.foregroundColor || ''
                }}
            >
                <div className="flex justify-between flex-1 w-full leading-none">
                    <header className="uppercase text-left font-bold ">
                        { item.name } ({`${ item.Brand?.name || "No branding"}, ${ item.year }`})
                    </header>
                    <div className="uppercase font-bold opacity-70 leading-none">
                        <small>ESTADO: { item.State.name }</small>
                    </div>
                </div>
            </div>
        </Link>
    )
}
