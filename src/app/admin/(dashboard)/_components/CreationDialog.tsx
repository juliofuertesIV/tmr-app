'use client'

import { CollectionNames } from '@/types'
import { useLayoutEffect, useRef, useState } from 'react'
import Form from '@/lib/forms/components/Form'
import { getFormSchema } from '@/lib/forms'
import { CircleAddIcon } from '../../_layout/design/icons/components/CircleAdd'
import { CloseIcon } from '../../_layout/design/icons/components/Close'

type Props = {
    collection: CollectionNames,
}

type DialogState = {
    collection: CollectionNames | null,
    isOpen: boolean
}

const initialDialogState : DialogState = {
    collection: null,
    isOpen: false
} 

export default function CreationDialog({ collection }: Props) {

    const dialogRef = useRef<HTMLDialogElement>(null)

    const [ dialog, setDialog ] = useState<DialogState>(initialDialogState)

    useLayoutEffect(() => {
        
        if (!dialogRef.current) return

        dialog.isOpen ? dialogRef.current.showModal() : dialogRef.current?.close()
        
    }, [ dialog.isOpen ])

    const onManageDialog = (dialogState: DialogState) => setDialog(dialogState)

    const { bindCreationAction, fields } = getFormSchema({ collection, actionTarget: 'creation' })
    const boundAction = bindCreationAction()

    return (
        <>
            <button 
                onClick={ () => onManageDialog({ collection, isOpen: true })}
                className="w-fit flex gap-2 justify-between ml-auto bg-neutral-300 text-neutral-800 font-bold hover:bg-neutral-50 hover:text-neutral-950 py-2 px-4 rounded-sm text-sm"
            >
                <span>CREAR NUEVO</span>
                <CircleAddIcon className='text-xl'/>
            </button>
            <dialog className='backdrop:bg-neutral-950 backdrop:opacity-50 bg-transparent w-full' ref={ dialogRef }>
                <div className='bg-neutral-950 text-neutral-100 border-2 border-neutral-300 rounded-md w-full max-w-2xl mx-auto'>
                    <header className='flex justify-end bg-neutral-700 rounded-t-md py-1 px-1'>
                        <button 
                            className='aspect-square w-4 flex items-center justify-center rounded-sm bg-neutral-200 text-neutral-800 text-xs m-1 hover:bg-orange-700'
                            onClick={ () => onManageDialog({ collection: null, isOpen: false}) }
                        >
                            <CloseIcon/>
                        </button>
                    </header>
                    <div className='p-4'>
                        <Form boundAction={ boundAction } fields={ fields }/>
                    </div>
                </div>
            </dialog>
        </>
    )
}
