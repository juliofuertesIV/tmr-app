import { IOneOfCollections } from '@/interfaces'
import { IMediaFormField } from '@/interfaces/forms'
import React from 'react'
import FileUploadForm from '../../_forms/media/FileUploadForm'

export default function ContestMediaManager({ collectionElement, mediaFields } : { collectionElement: IOneOfCollections, mediaFields: IMediaFormField[] }) {
  return (
    <>
        { mediaFields.map((field, index) => {
            return (
                <FileUploadForm key={ index } collectionElement={ collectionElement } mediaField={ field }/>
            )
        })}
    </>
  )
}
