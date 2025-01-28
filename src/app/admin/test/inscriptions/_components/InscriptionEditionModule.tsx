'use client'

import React from 'react';
import Form from '../../../../../lib/forms/Form';
import { getFormByCollectionName } from '@/lib/forms/collection';
import MediaInput from '@/lib/forms/MediaInput';
import { formSchemaActionIsUpdateAction, getFormSchema } from '@/lib/forms';
import { IInscription } from '@/types';

export default function InscriptionEditionModule({ inscription } : { inscription: IInscription }) {

    const { fields, getBoundAction } = getFormSchema({ collection: 'inscriptions', actionTarget: 'update' })

    if (!formSchemaActionIsUpdateAction(getBoundAction, 'update'))
      throw new Error('Error getting bound update action!')

    const boundAction = getBoundAction({ id: inscription.id })

    return (
      <section className='w-full'>
        <header className='py-4'>
          <h1>Inscription Media Form</h1>
          <h4>Create media and inscription.</h4>
        </header>
        <div>
            <Form boundAction={ boundAction } collection='inscriptions' fields={ fields } target='creation'>
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
