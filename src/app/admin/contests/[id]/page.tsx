import React from 'react'
import ContestEditionModule from './_components/ContestEditionModule'
import { getContestById } from '@/lib/fetch/get/contests'

type Props = {
    params: {
        id: string
    }
}

export default async function ContestPage({ params } : Props) {

    const { id } = params 

    const { data: contest } = await getContestById({ id })

    if (!contest) throw new Error('Error fetching contest!')

    return <ContestEditionModule contest={ contest }/>
}
