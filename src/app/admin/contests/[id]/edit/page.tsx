import { getCollectionElementById } from '@/lib/fetch/get/collections'
import { getFormSchema } from '@/lib/forms'
import Form from '@/lib/forms/components/Form'
import { IAllCollections, IContest } from '@/types'
import React from 'react'
import ContestEditionModule from './_components/ContestEditionModule'

const getContest = async ({ id }: { id: string }) => {
    const { data } = await getCollectionElementById('contests', id) as { data: IContest }
    return data
}

type Props = {
    params: {
        id: string
    }
}

export default async function EditContestPage({ params } : Props) {

    const { id } = params 

    const contest = await getContest({ id })

    return (
        <div>
            <ContestEditionModule contest={ contest }/>
        </div>
    )
}
