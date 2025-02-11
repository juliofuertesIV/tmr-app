import { getContestById } from '@/lib/fetch/get/contests'
import React from 'react'

const getData = async ({ id } : { id: string }) => {
    const res = await getContestById({ id })

    return { data: res.data }
}

export default async function ContestFooterPage({ params } : { params: { id: string }}) {

    const { id } = params

    const { data: contest } = await getData({ id })

    if (!contest) throw new Error('Contest not found.')

    const { Footer: footer } = contest

    return (
        <section>
            <header className='mb-2'>
                <h3 className='leading-none'>Footer: { footer.name }</h3>
                <small>ID: { footer.id }</small>
            </header>
            <div className='border-2 border-neutral-200 w-full flex gap-2 min-h-40 max-w-7xl rounded-md'/>
        </section>
    )
}
