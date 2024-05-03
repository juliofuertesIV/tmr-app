'use client'

import { useFormState } from 'react-dom'
import AdminFormSubmit from './AdminFormSubmit'
import { IEditionFormField, IFormEditionAction, IMediaFormField, formInitialState } from '@/interfaces/forms'
import AdminFormFeedback from './AdminFormFeedback'
import EditionInput from './inputs/EditionInput'
import { IOneOfCollectionNames, IOneOfCollections } from '@/interfaces'
import FileUploadForm from './inputs/FileUploadForm'

type Props = {
    collection: IOneOfCollectionNames,
    action: IFormEditionAction,
    fields: IEditionFormField[],
    mediaFields: IMediaFormField[],
    item: IOneOfCollections
}

export default function AdminEditionForm({ action, fields, mediaFields, collection, item } : Props) {

    const boundAction = action.bind(null, collection, item.id as string)
    
    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <>
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            {
                fields.map((field, index) => {
                    return (
                        <EditionInput 
                            key={ index }
                            input={ field }
                            item={ item }
                        />
                    )
                })
            }
            <AdminFormSubmit/>
        </form>
        <h2 className='mt-8 mb-2'>GESTIÓN DE IMÁGENES</h2>
        {
            mediaFields.map((field, index) => {

                const { mediaType, label, small, acceptedTypes } = field
                return (
                    <FileUploadForm 
                        key={ index }
                        mediaType={ mediaType }
                        collectionElement={ item }
                        label={ label }
                        small={ small }
                        acceptedTypes={ acceptedTypes }
                    />
                )
            })   
        }
        </>
    )
}
