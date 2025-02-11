import React from 'react'
import ContestEditionModule from './_components/ContestEditionModule'
import { getContestFromDatabaseById } from '@/lib/database/functions/contests'

type Props = {
    params: {
        id: string
    }
}

const getData = async ({ id } : { id: string }) => {

    const contest = await getContestFromDatabaseById({ 
        id, 
        scope: 'detailed' 
    })
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => { throw new Error(error as string)})

    return contest
}

export default async function ContestPage({ params } : Props) {

    const { id } = params 

    const contest = await getData({ id })

    return <ContestEditionModule contest={ contest }/>
}
