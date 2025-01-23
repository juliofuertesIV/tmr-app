import React from 'react'
import StandaloneMediaManager from './_components/StandaloneMediaManager'
import InscriptionForm from './_components/InscriptionForm'

export default function MediaTestPage() {
    return (
        <section className='admin-page-content'>
            <StandaloneMediaManager/>
            <InscriptionForm/>
            <hr/>
        </section>
    )
}
