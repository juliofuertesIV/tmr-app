import { IAllCollections } from '@/types'
import React from 'react'

type Props = {
    items: IAllCollections[],
}

export default function DashboardElement({ items } : Props) {
    return (
        <article className='col-span-2 bg-neutral-800 rounded-md w-full min-h-40'>
            <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                <h3 className='text-neutral-200'>ÚLTIMOS CONCURSOS</h3>
            </header>
            <div className='w-full flex flex-col gap-2 p-4'>
                {
                    items.map((item, index) => {
                        return (
                            <div   
                                className='bg-neutral-600 text-neutral-100 px-4 rounded-sm text-center flex justify-between items-center border border-transparent hover:border-neutral-100 cursor-pointer'
                                key={ `cts_${ index }`}
                            >
                                <div>{ item.name } </div>
                                <div className='text-sm'>{ item.createdAt.split('T')[0].slice(5).replace('-', '/') } a las { item.createdAt.split('T')[1].slice(0, 8) }h.</div>
                            </div>
                        )
                    })
                }
            </div>
        </article>
    )
}
