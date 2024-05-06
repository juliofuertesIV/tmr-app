'use client'

import { IContest, IContestState } from "@/interfaces"
import AdminFormSubmit from "../../_forms/AdminFormSubmit"
import { updateCollectionItem } from "@/app/_fetch/put"
import { useFormState } from "react-dom"
import { formInitialState } from "@/interfaces/forms"
import AdminFormFeedback from "../../_forms/AdminFormFeedback"
import StateRadioButton from "../../_forms/inputs/StateRadioButton"
import { useContext } from "react"
import { AdminContext } from "@/_providers/AdminProvider"

export default function ContestStates({ item: contest } : { item: IContest }) {
    
    const { states } = useContext(AdminContext)

    const boundAction = updateCollectionItem.bind(null, 'contests', contest.id as string)
    
    const [state, formAction] = useFormState(boundAction, formInitialState)
    
    return (
        <form action={ formAction }>
            <AdminFormFeedback state={ state }/> 
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
                <legend className="uppercase px-2">Cambiar estado del concurso</legend>
                {
                    states.map((state, index) => 
                        <StateRadioButton 
                            key={ index }
                            state={ state }
                            checked={ contest.StateId === state.id }
                        />
                    )
                }
                <AdminFormSubmit/>
            </fieldset>
        </form>
    )
}
