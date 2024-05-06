import { IContest } from '@/interfaces'
import React from 'react'
import FileUploadForm from '../inputs/media/FileUploadForm'
import { getEditionFormByCollectionName } from '../..'

export default function ContestMediaManager({ item: contest } : { item: IContest }) {

    const { mediaFields } = getEditionFormByCollectionName({ collection: 'contests' })

    return (
        <>
            { mediaFields.map((field, index) => {
                return (
                    <FileUploadForm key={ index } collectionElement={ contest } mediaField={ field }/>
                )
            })}
        </>
    )
}
