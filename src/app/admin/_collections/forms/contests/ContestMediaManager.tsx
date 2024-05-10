import { IContest } from '@/interfaces'
import React from 'react'
import SingleFileUploadForm from '../inputs/media/SingleFileUploadForm'
import { getEditionFormByCollectionName } from '../..'

export default function ContestMediaManager({ item: contest } : { item: IContest }) {

    const { mediaFields } = getEditionFormByCollectionName({ collection: 'contests' })

    return (
        <div className='flex flex-col gap-4 w-full'>
            {
                mediaFields.map((field, index) => 
                    <SingleFileUploadForm key={ index } collectionElement={ contest } mediaField={ field }/>
                )
            }
        </div>
    )
}
