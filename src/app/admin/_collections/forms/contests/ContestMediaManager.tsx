import { IContest } from '@/interfaces'
import React from 'react'
import FileUploadForm from '../inputs/media/FileUploadForm'
import { getMediaFieldsByCollection } from '../..'


export default function ContestMediaManager({ contest } : { contest: IContest }) {
    
    const mediaFields = getMediaFieldsByCollection({ collection: 'contests' })

    return (
        <div className='flex flex-col gap-4 w-full'>
            {
                mediaFields.map((field, index) => 
                    <FileUploadForm key={ index } collectionElement={ contest } mediaField={ field } showDatabaseValue={ true }/>
                )
            }
        </div>
    )
}
