'use client'

import React, { useContext, useLayoutEffect, useRef, useState } from 'react'
import ContestGrid from './layout/ContestGrid'
import BrandGrid from './layout/_brands/BrandGrid'
import { IOneOfCollectionNames } from '@/interfaces'
import Dialog from './Dialog'
import { AdminContext } from '@/_providers/AdminProvider'


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

    const data = useContext(AdminContext)

    console.log({ data })

    useLayoutEffect(() => {

        if (dialog.isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [ dialog ])

    return (
        <div className="flex flex-col gap-4">
        <section className="w-full max-w-5xl mx-auto bg-gradient-to-tr from-neutral-900 to-neutral-800 rounded-xl overflow-hidden">
            <header className="flex justify-between w-full py-4 mb-8 bg-neutral-700 pt-4 px-8">
                <h2>GESTIÓN DE CONCURSOS</h2>
                <button 
                    onClick={ () => onManageDialog({ collection: 'contests', isOpen: true })}
                    className="bg-neutral-500 text-neutral-100 font-bold hover:bg-neutral-600 hover:text-neutral-50 px-4 rounded-md text-sm transition-colors shadow-md"
                >
                    ADD NEW
                </button>
            </header>
            <div className="px-8 pb-8">
                <ContestGrid contests={ contests }/>
            </div>
        </section>
        <section className="w-full max-w-5xl mx-auto bg-gradient-to-tr from-neutral-900 to-neutral-800 rounded-xl overflow-hidden">
            <header className="flex justify-between w-full py-4 mb-8 bg-neutral-700 pt-4 px-8">
                <h2>GESTIÓN DE MARCAS</h2>
                <button 
                    onClick={ () => onManageDialog({ collection: 'brands', isOpen: true })}
                    className="bg-neutral-500 text-neutral-100 font-bold hover:bg-neutral-600 hover:text-neutral-50 px-4 rounded-md text-sm transition-colors shadow-md"
                >
                    ADD NEW
                </button>
            </header>
            <div className="px-8 pb-8">
                <BrandGrid brands={ brands }/>
            </div>
        </section>
        <dialog ref={ dialogRef } className='backdrop:bg-neutral-950 backdrop:opacity-50 bg-transparent w-full'>
            <Dialog collection={ dialog.collection } onManageDialog={ onManageDialog }/>
        </dialog>
    </div>
    ) 
}
