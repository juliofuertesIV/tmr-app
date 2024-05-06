'use client'

import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import { IOneOfCollectionNames, IOneOfCollections } from '@/interfaces'
import Dialog from './Dialog'
import { AdminContext } from '@/_providers/AdminProvider'
import CollectionGrid from './layout/CollectionGrid'
import CollectionSection from './layout/CollectionSection'

type DialogState = {
    collection: IOneOfCollectionNames | null,
    isOpen: boolean
}

const initialDialogState : DialogState = {
    collection: null,
    isOpen: false
} 

export default function Dashboard() {

    const [ dialog, setDialog ] = useState<DialogState>(initialDialogState)

    const dialogRef = useRef<HTMLDialogElement>(null)

    const onManageDialog = (dialogState: DialogState) => setDialog(dialogState)

    const { contests, brands } = useContext(AdminContext)

    useLayoutEffect(() => {

        if (dialog.isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [ dialog ])

    return (
        <div className="flex flex-col gap-4">
            <CollectionSection title='Concursos' onManageDialog={ onManageDialog }>
                <CollectionGrid collection={ 'contests' } items={ contests as IOneOfCollections[] }/>
            </CollectionSection>
            <CollectionSection title='Marcas' onManageDialog={ onManageDialog }>
                <CollectionGrid collection={ 'brands' } items={ brands as IOneOfCollections[] }/>
            </CollectionSection>
            <dialog ref={ dialogRef } className='backdrop:bg-neutral-950 backdrop:opacity-50 bg-transparent w-full'>
                <Dialog collection={ dialog.collection } onManageDialog={ onManageDialog }/>
            </dialog>
        </div>
    ) 
}
