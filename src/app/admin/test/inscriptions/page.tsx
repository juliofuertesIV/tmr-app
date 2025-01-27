import { Contest } from '@/database/models'
import { IContest } from '@/types'
import React from 'react'

const getContestByDomain = async (domain: string) => {
    return await Contest.findOne({ where: { domain }})
    .then(data => data)
    .catch(error => { throw new Error(error as string)}) as unknown as IContest | null
}

export default async function TestInscriptionsPage() {

    const contest = await getContestByDomain('battleofthebands.com')
    
    return (
        <div>

        </div>
    )
}
