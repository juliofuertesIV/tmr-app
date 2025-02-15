import { ReactNode } from 'react'
import LabelIcon from './LabelIcon'

type Props = {
    textContent: string,
    isValid: boolean | null,
    children: ReactNode
}

export default function Label({ textContent, isValid, children } : Props) {

    return (
        <label 
            className='group flex flex-col gap-1 py-1 pb-2'
            data-valid={ isValid }
        >
            <p className='text-neutral-200 group-data-[valid="true"]:text-green-500 group-data-[valid="false"]:text-red-800 flex gap-2 items-center'>
                { textContent }
                <LabelIcon isValid={ isValid }/>    
            </p>
            { children }
        </label>
    )
}
