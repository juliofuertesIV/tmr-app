'use client'

import { getFormByCollectionName } from '@/lib/forms/collection'
import React from 'react';
import Form from '../../../../../lib/forms/Form';

export default function MediaManager() {

    const { action, fields } = getFormByCollectionName({ collection: 'inscriptions', actionTarget: 'creation' })

    return (
      <section className='w-full'>
        <header className='py-4'>
          <h1>Basic Media Form</h1>
          <h4>Create collection element with media. Case: Inscriptions. Working so far.</h4>
        </header>
        <div>
            <Form action={ action } fields={ fields } collection='inscriptions'>
              <input type="hidden" name="ContestId" value={ 'f003d9eb-e15e-420e-b3a8-178b96d01325' } />
              <input type="hidden" name="role" value={ 'inscriptions' } />
              <input type="hidden" name="alt" value={ 'Inscription image for battleofthebands.com' } />
              <input type="hidden" name="width" value={ '500' } />
              <input type="hidden" name="height" value={ '500' } />
              <input type="hidden" name="year" value={ '2025' } />
              <input type="hidden" name="domain" value={ 'battleofthebands.com' } />
            </Form>
          </div>
      </section>
    )
}
