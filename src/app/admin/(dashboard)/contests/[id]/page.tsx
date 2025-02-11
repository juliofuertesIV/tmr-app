import React from 'react'
import ContestEditionModule from './_components/ContestEditionModule'
import { getContestPageData } from './_functions'

type Props = {
    params: {
        id: string
    }
}

export default async function ContestPage({ params } : Props) {

    const { id } = params 

    const contest = await getContestPageData({ id })

    return <ContestEditionModule contest={ contest }/>
}
