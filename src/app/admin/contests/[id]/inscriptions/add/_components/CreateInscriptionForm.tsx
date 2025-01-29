'use client'

import { IContest } from "@/types"
import Form from "@/lib/forms/Form"
import { getFormSchema } from "@/lib/forms"

type Props = {
    contest: IContest
}

export default function CreateInscriptionForm({ contest } : Props) {

    const { bindCreationAction, fields } = getFormSchema({ collection: 'inscriptions', actionTarget: 'creation' })

    const boundAction = bindCreationAction()

    return (
        <div>
            <Form boundAction={ boundAction } fields={ fields }>
                <input type="hidden" value={ new Date().getFullYear() } name="year"/>
                <input type="hidden" value={ contest.id } name="ContestId"/>
                <input type="hidden" value={ contest.domain } name="domain"/>
                <input type="hidden" value={ 500 } name="width"/>
                <input type="hidden" value={ 500 } name="height"/>
                <input type="hidden" value={ 'inscriptions' } name="role"/>
            </Form>
        </div>
    )
}
