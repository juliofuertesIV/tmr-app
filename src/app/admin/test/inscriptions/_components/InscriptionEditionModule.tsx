'use client'

import React from 'react';
import Form from '../../../../../lib/forms/components/Form';
import MediaInput from '@/lib/forms/components/media/MediaInput';
import { getFormSchema } from '@/lib/forms';
import { Inscription } from '@/types';
import InscriptionContestInputFields from './InscriptionContestInputFields';

export default function InscriptionEditionModule({ inscription } : { inscription: Inscription }) {

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
                /> 
                <InscriptionContestInputFields contest={ inscription.Contest }/>
            </Form>
          </div>
      </section>
    )
}
