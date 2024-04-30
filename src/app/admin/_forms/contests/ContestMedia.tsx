'use client'

import { IContest, IContestMediaType } from "@/interfaces"
import AdminFormSubmit from "../AdminFormSubmit"
import { useFormState } from "react-dom"
import { formInitialState } from "@/interfaces/forms"
import AdminFormFeedback from "../AdminFormFeedback"
import { useRef, useState } from "react"
import { manageCollectionMedia } from "@/app/_fetch/post"
import FileInput from "../inputs/FileInput"

type IFooterElementField = {
    type: IContestMediaType,
    label: 'Elemento de footer:'
}

const footerElementField : IFooterElementField = {
    type: 'footerElement' as IContestMediaType,
    label: 'Elemento de footer:'
} 

export default function ContestMedia({ contest } : { contest: IContest }) {
    
    const boundAction = manageCollectionMedia.bind(null, 'contests', contest.id as string)
    
    const [state, formAction] = useFormState(boundAction, formInitialState)
    
    const [ footerElements, setFooterElements ] = useState<IFooterElementField[]>([ footerElementField ])

    const form = useRef(null)

    return (
        <div>
            <form action={ formAction } ref={ form }> 
                <AdminFormFeedback state={ state }/>
                <div className=" flex flex-col gap-2">
                    <h3 className="uppercase pb-2">Add media:</h3>
                    <FileInput type="logo" label="Logo: "/>
                    <FileInput type="banner" label="Banner: "/>
                    {
                        footerElements.map((field, index) => {
                            return <FileInput key={ index } type={ field.type } label={ field.label }/>
                        })
                    }
                    <div className="flex gap-2 pt-4">
                        <button 
                            type="button"
                            className=" bg-neutral-100 px-4 py-1 rounded-sm text-neutral-800 flex-1"
                            onClick={ () => setFooterElements(prev => prev = [...prev, footerElementField]) }
                        >
                            Añadir elemento de footer
                        </button>
                        <button 
                            type="button"
                            className=" bg-neutral-100 px-4 py-1 rounded-sm text-neutral-800 flex-1" 
                            onClick={ () => setFooterElements(prev => prev = prev.length > 1 ? prev.slice(0, prev.length - 1) : prev) }
                        >
                            Quitar elemento de footer
                        </button>
                    </div>
                <AdminFormSubmit/>
                </div>
            </form>
        </div>
    )
}
