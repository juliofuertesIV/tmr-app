import { IOneOfCollectionNames } from '@/types'
import React from 'react'


type Props = {
    title: string,
    onManageDialog: ({ collection, isOpen } : { collection: IOneOfCollectionNames, isOpen: boolean }) => void,
    collection: IOneOfCollectionNames,
    children: React.ReactNode
}

export default function CollectionSection({ children, collection, onManageDialog, title } : Props) {
  return (
    <section className="w-full max-w-5xl mx-auto bg-gradient-to-tr from-neutral-950 to-neutral-900 rounded-md overflow-hidden shadow-md">
        <header className="flex justify-between w-full py-4 mb-8 bg-neutral-700 pt-4 px-8">
            <h2 className='pointer-events-none'>{ title }</h2>
            <button 
                onClick={ () => onManageDialog({ collection, isOpen: true })}
                className="bg-neutral-500 text-neutral-100 font-bold hover:bg-neutral-600 hover:text-neutral-50 px-4 rounded-md text-sm transition-colors shadow-md"
            >
                CREAR NUEVO
            </button>
        </header>
        <div className="px-8 pb-8">
            { children }
        </div>
    </section>
  )
}
