
import { getInscriptionById } from '@/lib/fetch/get/inscriptions'
import React from 'react'

export default async function TestInscriptionsPage({ params } : { params: { id: string }}) {

    const { id } = params

    const { data: inscription } = await getInscriptionById(id)

    if (!inscription) throw new Error('No contest found!')

    return (
        <section className='admin-page-content'>
            <header>
                <p>Gestionar inscripción</p>
                <h1>{ inscription.name }</h1>
            </header>
            <hr className='my-4 max-w-xl'/>
            
        </section>
    )
}
