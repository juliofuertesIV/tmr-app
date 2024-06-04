import { IContest } from '@/lib/types'
import React from 'react'
import { getMediaFieldsByCollection } from '../../collection'
import FileUploadForm from './FileUploadForm'


export default function ContestMediaManager({ contest } : { contest: IContest }) {
    
    const mediaFields = getMediaFieldsByCollection({ collection: 'contests' })

    return (
        <div className='grid grid-cols-2 gap-4 w-full max-w-4xl mx-auto'>
            {
                mediaFields.map((field, index) => 
                    <FileUploadForm key={ index } collectionElement={ contest } mediaField={ field } showDatabaseValue={ true }/>
                )
            }
        </div>
    )
}
