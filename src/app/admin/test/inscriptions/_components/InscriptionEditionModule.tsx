'use client'

import React from 'react';
import Form from '../../../../../lib/forms/Form';
import MediaInput from '@/lib/forms/MediaInput';
import { getFormSchema } from '@/lib/forms';
import { IInscription } from '@/types';

export default function InscriptionEditionModule({ inscription } : { inscription: IInscription }) {

    const { bindUpdateAction, fields } = getFormSchema({ collection: 'inscriptions', actionTarget: 'update' })

    const boundAction = bindUpdateAction({ id: inscription.id })

    return (
      <section className='w-full'>
        <header className='py-4'>
          <h1>Inscription Media Form</h1>
          <h4>Create media and inscription.</h4>
        </header>
        <div>
            <Form boundAction={ boundAction } fields={ fields }>
                <MediaInput
                    role='inscriptions'
                    alt='Inscription media for this band.'
                    domain='battleofthebands.com' 
                    collection='inscriptions'
                /> 
            </Form>
          </div>
      </section>
    )
}
