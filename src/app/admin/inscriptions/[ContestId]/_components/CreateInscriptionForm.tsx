'use client'

import { IContest } from "@/types"
import Form from "@/forms/Form"
import { getFormByCollectionName } from "@/forms/collection"

type Props = {
    contest: IContest
}

export default function CreateInscriptionForm({ contest } : Props) {

    const { fields, action } = getFormByCollectionName({ collection: 'inscriptions', actionTarget: 'creation' })

    return (
        <div>
            <Form collection="inscriptions" action={ action } fields={ fields }>
                <input type="hidden" value={ new Date().getFullYear() } name="year"/>
                <input type="hidden" value={ contest.id } name="ContestId"/>
                <input type="hidden" value={ contest.domain } name="domain"/>
            </Form>
        </div>
    )
}
