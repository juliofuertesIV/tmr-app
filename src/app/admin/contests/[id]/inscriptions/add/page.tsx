import CreateInscriptionForm from '@/app/admin/contests/[id]/inscriptions/add/_components/CreateInscriptionForm'
import { Contest } from '@/database/models'
import { IContest } from '@/types'
import React from 'react'

const getData = async ({ contestId } : { contestId: string }) => {
    return await Contest.findOne({ where: { id: contestId }}).then(data => data) as unknown as IContest
}

export default async function AddInscriptionPage({ params } : { params: { id: string }}) {

    const { id: contestId } = params

    const contest = await getData({ contestId })

    return (
        <CreateInscriptionForm contest={ contest } /> 
    )
}
