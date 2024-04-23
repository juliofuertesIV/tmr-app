import { IContestState } from '@/interfaces'
import React from 'react'

export default function ContestStateRadioButton({ checked, state } : { checked: boolean, state: IContestState }) {

    const { id, name, description } = state

    return (
        <div 
            className="bg-neutral-800 rounded-md px-2 pt-2 pb-1 flex flex-col justify-center data-[checked='true']:bg-green-800"
            data-checked={ checked }
        >
            <label className="flex-1">
                <div className="flex gap-2 leading-none">
                    <input type="radio" name="StateId" value={ id } defaultChecked={ checked } />
                    <p className="flex-1 uppercase">{ name }</p>
                </div>
                <div className=" px-4 leading-none py-1">
                    <small className="opacity-70">{ description }</small>
                </div>
            </label>
        </div>
        )
}
