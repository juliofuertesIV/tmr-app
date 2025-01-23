'use client'

import React from 'react';
import Form from '../../../../../lib/forms/Form';
import { getFormByCollectionName } from '@/lib/forms/collection';
import MediaInput from '@/lib/forms/MediaInput';

export default function StandaloneMediaManager() {

    const { action } = getFormByCollectionName({ collection: 'media', actionTarget: 'creation' })

    return (
      <section className='w-full'>
        <header className='py-4'>
          <h1>Basic Media Form</h1>
          <h4>Create standalone media.</h4>
        </header>
        <div>
            <Form action={ action } collection='media'>
                <MediaInput
                    role='managers'
                    alt='Alt text'
                    domain='battleofthebands.com'
                    collection='managers'
                />
                {/* 
                    <input type="file" name="file"/>
                    <input type="hidden" name="role" value={ 'managers' } />
                    <input type="hidden" name="alt" value={ 'Inscription image for battleofthebands.com' } />
                    <input type="hidden" name="width" value={ '500' } />
                    <input type="hidden" name="height" value={ '500' } />
                    <input type="hidden" name="year" value={ '2025' } />
                    <input type="hidden" name="collection" value={ 'managers' } />
                    <input type="hidden" name="domain" value={ 'battleofthebands.com' } /> 
                */}
            </Form>
          </div>
      </section>
    )
}
