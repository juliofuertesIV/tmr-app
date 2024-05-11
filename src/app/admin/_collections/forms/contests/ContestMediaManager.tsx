import { IContest } from '@/interfaces'
import React from 'react'
import FileUploadFormWithPreview from '../inputs/media/FileUploadFormWithPreview'
import { getEditionFormByCollectionName } from '../..'

export default function ContestMediaManager({ item: contest } : { item: IContest }) {

    const { mediaFields } = getEditionFormByCollectionName({ collection: 'contests' })

    return (
        <div className='flex flex-col gap-4 w-full'>
            {
                mediaFields.map((field, index) => 
                    <FileUploadFormWithPreview key={ index } collectionElement={ contest } mediaField={ field }/>
                )
            }
        </div>
    )
}
