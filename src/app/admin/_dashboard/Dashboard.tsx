'use client'

import { IOneOfCollectionNames } from '@/types'
import { IAdminData } from '@/types/admin'

type DialogState = {
    collection: IOneOfCollectionNames | null,
    isOpen: boolean
}

export default function Dashboard({ data } : { data: IAdminData }) {

    return (
        <section className="w-full grid grid-cols-6 gap-4 max-w-6xl mx-auto px-4">
            <header className='pl-4 pb-4 col-span-6'>
                <h1>PANEL GENERAL</h1>
            </header>
            <article className='col-span-2 bg-neutral-800 rounded-md w-full min-h-40'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ÚLTIMOS CONCURSOS</h3>
                </header>
                <div className='bg-neutral-700 w-full flex'></div>
            </article>
            <article className='col-span-4 bg-neutral-800 rounded-md w-full min-h-40'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ÚLTIMAS INSCRIPCIONES</h3>
                </header>
                <div className='bg-neutral-700 w-full flex'></div>
            </article>
            <article className='col-span-2 bg-neutral-800 rounded-md w-full min-h-40'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ÚLTIMAS MARCAS</h3>
                </header>
                <div className='bg-neutral-700 w-full flex'></div>
            </article>
            <article className='col-span-4 bg-neutral-800 rounded-md w-full min-h-40'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ÚLTIMOS VOTANTES</h3>
                </header>
                <div className='bg-neutral-700 w-full flex'></div>
            </article>
            <article className='col-span-6 bg-neutral-800 rounded-md w-full min-h-40'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ESTADÍSTICAS</h3>
                </header>
                <div className='bg-neutral-700 w-full flex'></div>
            </article>
        </section>
    ) 
}
