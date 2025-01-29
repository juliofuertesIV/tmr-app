'use client'

import MediaForm from "@/lib/forms/components/MediaForm"
import { ICollectionsWithMedia } from "@/types"
import { IMediaFormField } from "@/types/forms"
import { ICollectionsWithMediaNames } from "@/types/media"

type Props = {
    collection: ICollectionsWithMediaNames,
    collectionItem: ICollectionsWithMedia,
    mediaFields: IMediaFormField[],
}

export default function MediaFormWrapper({ collection, collectionItem, mediaFields } : Props) {   

    return (
        <div className="grid grid-cols-2 gap-2">
            {
                mediaFields.map((field, index) => 
                    <MediaForm
                        key={ index }
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
