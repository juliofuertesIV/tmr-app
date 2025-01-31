'use client'

import React from 'react';
import Form from '../../../../../lib/forms/components/Form';
import { getFormSchema } from '@/lib/forms';
import { IContest } from '@/types';
import InscriptionContestInputFields from './InscriptionContestInputFields';

export default function InscriptionCreationModule({ contest } : { contest: IContest }) {

    const { bindCreationAction, fields } = getFormSchema({ collection: 'inscriptions', actionTarget: 'creation' })

    const boundAction = bindCreationAction()

    return (
      <section className='w-full'>
        <header className='py-4'>
          <h1>Inscription Media Form</h1>
          <h4>Create media and inscription.</h4>
        </header>
        <div>
            <Form boundAction={ boundAction } fields={ fields } >
                <InscriptionContestInputFields contest={ contest }/>
            </Form>
          </div>
      </section>
    )
}
