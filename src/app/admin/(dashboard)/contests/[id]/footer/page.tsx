import React from 'react'
import { getContestPageData } from '../_functions'

const getData = async ({ id } : { id: string }) => {
    const contest = await getContestPageData({ id })

    return JSON.parse(JSON.stringify(contest))
}

export default async function ContestFooterPage({ params } : { params: { id: string }}) {

    const { id } = params

    const contest = await getData({ id })

    if (!contest) throw new Error('Contest not found.')

    const { Footer: footer } = contest

    return (
        <section>
            <header className='mb-2'>
                <h3 className='leading-none'>Footer: { footer.name }</h3>
            </header>
            <div className='border-2 border-neutral-200 w-full flex gap-2 min-h-40 max-w-7xl rounded-md'/>
        </section>
    )
}
