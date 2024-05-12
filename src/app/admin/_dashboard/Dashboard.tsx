'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { IOneOfCollectionNames, IOneOfCollections } from '@/interfaces'
import Dialog from './Dialog'
import { IAdminData } from '@/_providers/AdminDataProvider'
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

export default function Dashboard({ data } : { data: IAdminData }) {

    const { contests, brands } = data

    const [ dialog, setDialog ] = useState<DialogState>(initialDialogState)
    const dialogRef = useRef<HTMLDialogElement>(null)

    useLayoutEffect(() => {
        
        if (!dialogRef.current) return
        
        dialog.isOpen ? 
        dialogRef.current.showModal() 
        : dialogRef.current?.close()
        
    }, [ dialog ])

    const onManageDialog = (dialogState: DialogState) => setDialog(dialogState)

    return (
        <div className="w-full flex flex-col gap-4">
            <CollectionSection collection='contests' title='Últimos concursos' onManageDialog={ onManageDialog }>
                <CollectionGrid collection={ 'contests' } items={ contests as IOneOfCollections[] }/>
            </CollectionSection>
            <CollectionSection collection='brands' title='Marcas' onManageDialog={ onManageDialog }>
                <CollectionGrid collection={ 'brands' } items={ brands as IOneOfCollections[] }/>
            </CollectionSection>
            <dialog ref={ dialogRef } className='backdrop:bg-neutral-950 backdrop:opacity-50 bg-transparent w-full'>
                <Dialog collection={ dialog.collection } onManageDialog={ onManageDialog }/>
            </dialog>
        </div>
    ) 
}
