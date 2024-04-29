'use client'

import { IBrand, IContest } from "@/interfaces"
import AdminFormSubmit from "../AdminFormSubmit"
import { updateCollectionItem } from "@/app/_fetch/put"
import { useFormState } from "react-dom"
import { IAPIResponse } from "@/interfaces/forms"
import AdminFormFeedback from "../AdminFormFeedback"
import ContestBrandRadioButton from "../inputs/ContestBrandRadioButton"
import { useRef, useState } from "react"

const initialState : IAPIResponse = {
    success: false,
    message: '',
    error: null,
    data: null
} 

export default function AdminContestBrands({ contest, brands } : { contest: IContest, brands: IBrand[] }) {
    
    const boundAction = updateCollectionItem.bind(null, 'contests', contest.id as string)
    
    const [state, formAction] = useFormState(boundAction, initialState)
    
    const form = useRef(null)

    return (
        <div>
            <form action={ formAction } ref={ form }> 
                <AdminFormFeedback state={ state }/>
                <div className=" flex flex-col gap-2">
                    <h3 className="uppercase pb-2">Add media:</h3>
                    <label>
                        <input type="file" name="media"/>
                    </label>
                <AdminFormSubmit/>
                </div>
            </form>
        </div>
    )
}
