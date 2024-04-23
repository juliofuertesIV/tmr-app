'use client'

import { IContest, IContestState } from "@/interfaces"
import AdminFormSubmit from "../AdminFormSubmit"
import { updateCollectionItem } from "@/app/_fetch/put"
import { useFormState } from "react-dom"
import { IAPIResponse } from "@/interfaces/forms"
import AdminFormFeedback from "../AdminFormFeedback"
import ContestStateRadioButton from "./ContestStateRadioButton"

const initialState : IAPIResponse = {
    success: false,
    message: '',
    error: null,
    data: null
} 

export default function AdminContestStates({ contest, states } : { contest: IContest, states: IContestState[] }) {
    
    const boundAction = updateCollectionItem.bind(null, 'contests', contest.id as string)
    
    const [state, formAction] = useFormState(boundAction, initialState)
    
    return (
        <form action={ formAction }>
            <AdminFormFeedback state={ state }/> 
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
                <legend className="uppercase px-2">Cambiar estado del concurso</legend>
                {
                    states.map((state, index) => 
                        <ContestStateRadioButton 
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
