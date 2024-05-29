'use client'

import { IContest } from "@/types"
import ContactInfoInputs from "./form/ContactInfoInputs"
import InscriptionInfoInputs from "./form/InscriptionInfoInputs"
import FormSubmit from "@/forms/feedback/FormSubmit"

type Props = {
    contest: IContest
}

export default function CreateInscriptionForm({ contest } : Props) {

    return (
        <form className="flex flex-col">
            <InscriptionInfoInputs/>
            <ContactInfoInputs/>

            <input type="hidden" name="ContestId" value={ contest.id } />
            <FormSubmit value="Inscribir"/>
        </form>
    )
}
