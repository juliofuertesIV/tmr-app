'use client'

import { IContest } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import SingleFileUploadForm from '../inputs/media/SingleFileUploadForm'
import { IMediaFormField } from '@/interfaces/forms'

export default function FooterManager({ item: contest } : { item: IContest }) {

    const [ footerFields, setFooterFields ] = useState<IMediaFormField[]>([])

    const [ numberOfFooterFields, setNumberOfFooterFields ] = useState<number>(1)

    useEffect(() => {

        const footerMediaField : IMediaFormField = {
            role: 'footerElement',
            label: 'Imagen de footer',
            instructions: 'Tipo svg / png',
            acceptedTypes: 'image/png, image/svg+xml',
            multiple: true,
        }

        setFooterFields(new Array(numberOfFooterFields).fill(footerMediaField))

    }, [ numberOfFooterFields ])

    const onAddFooterElement = () => setNumberOfFooterFields(prev => prev = numberOfFooterFields + 1)
    const onRemoveFooterElement = () => setNumberOfFooterFields(prev => prev > 1 ? prev = numberOfFooterFields - 1 : prev = 1)

    return (
        <div className='flex flex-col gap-4 w-full justify-start h-full'>
            <div className='flex gap-4 mx-auto'>
                <button 
                    className='px-4 py-1 rounded-sm bg-neutral-200 text-neutral-900 cursor-pointer'
                    onClick={ onAddFooterElement }
                    type='button'
                    role='button'
                >
                    Añadir elemento al footer
                </button>
                <button 
                    className='px-4 py-1 rounded-sm bg-neutral-200 text-neutral-900 cursor-pointer'
                    onClick={ onRemoveFooterElement }
                    type='button'
                    role='button'
                >
                    Eliminar elemento del footer
                </button>
            </div>
            {
                footerFields.map((field, index) => 
                    <SingleFileUploadForm key={ index } collectionElement={ contest } mediaField={ field }/>
                )
            }
        </div>
    )
}
