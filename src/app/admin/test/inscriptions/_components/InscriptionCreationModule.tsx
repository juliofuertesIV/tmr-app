'use client'

import React from 'react';
import Form from '../../../../../lib/forms/Form';
import MediaInput from '@/lib/forms/MediaInput';
import { formSchemaActionIsUpdateAction, getFormSchema } from '@/lib/forms';
import { IContest } from '@/types';
import InscriptionContestInputFields from './InscriptionContestInputFields';

export default function InscriptionCreationModule({ contest } : { contest: IContest }) {

    const { fields, getBoundAction } = getFormSchema({ collection: 'inscriptions', actionTarget: 'creation' })

    if (formSchemaActionIsUpdateAction(getBoundAction, 'creation'))
      throw new Error('Error getting creation bound action!')

    return (
      <section className='w-full'>
        <header className='py-4'>
          <h1>Inscription Media Form</h1>
          <h4>Create media and inscription.</h4>
        </header>
        <div>
            <Form boundAction={ getBoundAction } collection='inscriptions' fields={ fields } target='creation'>
                <MediaInput
                    role='inscriptions'
                    alt='Inscription media for this band.'
                    domain={ contest.domain } 
                    collection='inscriptions'
                />
                <InscriptionContestInputFields contest={ contest }/>
            </Form>
          </div>
      </section>
    )
}
