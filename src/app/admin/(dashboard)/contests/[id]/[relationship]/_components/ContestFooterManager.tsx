import { Contest } from '@/types/contests'
import React from 'react'

export default function ContestFooterManager({ contest } : { contest: Contest }) {

    const { Footer } = contest

    return (
        <section>
            <h3>Sponsors:</h3>
            <div className='flex gap-2 items-center justify-center w-full max-w-6xl border-2 rounded-md p-4'>
                {
                    Footer.Sponsors.map((sponsor, index) => {
                        return (
                            <div className='border border-gray-500 px-4 py-2' key={ index }>
                                <h3>{ sponsor.name }</h3>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}
