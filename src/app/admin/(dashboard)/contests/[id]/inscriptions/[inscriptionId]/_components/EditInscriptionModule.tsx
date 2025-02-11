'use client'

import { getFormSchema } from "@/lib/forms"
import Form from "@/lib/forms/components/Form"
import { AllCollections, Inscription } from "@/types"

export default function EditInscriptionModule({ inscription } : { inscription: Inscription }) {
    
    const { fields, bindUpdateAction } = getFormSchema({ collection: 'inscriptions', actionTarget: 'update' })

    const boundAction = bindUpdateAction({ id: inscription.id })


    return (
        <section>
            { /* TO DO: ADD MEDIA FORM */ }
            <Form fields={ fields } boundAction={ boundAction } collectionItem={ inscription as AllCollections }/>
        </section>
    )

}