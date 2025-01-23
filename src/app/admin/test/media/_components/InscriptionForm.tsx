'use client'

import React from 'react';
import Form from '../../../../../lib/forms/Form';
import { getFormByCollectionName } from '@/lib/forms/collection';
import MediaInput from '@/lib/forms/MediaInput';

export default function InscriptionForm() {

    const { action, fields } = getFormByCollectionName({ collection: 'inscriptions', actionTarget: 'creation' })

    return (
      <section className='w-full'>
        <header className='py-4'>
          <h1>Inscription Media Form</h1>
          <h4>Create media and inscription.</h4>
        </header>
        <div>
            <Form action={ action } collection='inscriptions' fields={ fields }>
                <MediaInput
                    role='inscriptions'
                    alt='Inscription media for this band.'
                    domain='battleofthebands.com' 
                    collection='inscriptions'
                />
                <input type="hidden" name="year" value={ '2025' } />
                <input type="hidden" name="domain" value={ 'battleofthebands.com' } /> { /* DUMMY DATA CONTEST */}
                <input type="hidden" name="ContestId" value={ 'f003d9eb-e15e-420e-b3a8-178b96d01325' } /> { /* DUMMY DATA CONTEST */}
            </Form>
          </div>
      </section>
    )
}
