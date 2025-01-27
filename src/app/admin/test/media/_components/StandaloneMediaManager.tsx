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
            <Form action={ action } collection='media' target='addMedia'>
                <MediaInput
                    role='managers'
                    alt='Alt text'
                    domain='battleofthebands.com'
                    collection='managers'
                />
            </Form>
          </div>
      </section>
    )
}
