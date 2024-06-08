'use client'

import MediaForm from "@/lib/forms/inputs/MediaForm"
import { ICollectionsWithMedia } from "@/types"
import { IFormAction, IMediaFormField } from "@/types/forms"
import { ICollectionsWithMediaNames } from "@/types/media"

type Props = {
    collection: ICollectionsWithMediaNames,
    collectionItem?: ICollectionsWithMedia,
    mediaFields: IMediaFormField[],
    action: IFormAction
}

export default function MediaFormWrapper({ collection, collectionItem, mediaFields, action } : Props) {   

    return (
        <div>
            {
                mediaFields.map((field, index) => 
                    <MediaForm 
                        key={ index }
                        action={ action }
                        collection={ collection }
                        collectionItem={ collectionItem }
                        field={ field }
                        domain={ 'test-domain' }
                    />
                )
            }
        </div>
    )
}
