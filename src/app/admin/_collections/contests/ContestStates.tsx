'use client'

import { IContest, IContestState } from "@/interfaces"
import AdminFormSubmit from "../../_forms/AdminFormSubmit"
import { updateCollectionItem } from "@/app/_fetch/put"
import { useFormState } from "react-dom"
import { formInitialState } from "@/interfaces/forms"
import AdminFormFeedback from "../../_forms/AdminFormFeedback"
import StateRadioButton from "../../_forms/inputs/StateRadioButton"

export default function ContestStates({ collectionElement, items } : { collectionElement: IContest, items: IContestState[] }) {
    
    const boundAction = updateCollectionItem.bind(null, 'contests', collectionElement.id as string)
    
    const [state, formAction] = useFormState(boundAction, formInitialState)
    
    return (
        <form action={ formAction }>
            <AdminFormFeedback state={ state }/> 
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
                <legend className="uppercase px-2">Cambiar estado del concurso</legend>
                {
                    items.map((state, index) => 
                        <StateRadioButton 
                            key={ index }
                            state={ state }
                            checked={ collectionElement.StateId === state.id }
                        />
                    )
                }
                <AdminFormSubmit/>
            </fieldset>
        </form>
    )
}
