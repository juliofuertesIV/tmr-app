'use client'

import { deleteMediaItem } from '@/lib/fetch/delete'
import { IManager } from '@/types'
import React, { MutableRefObject } from 'react'
import CurrentProfilePicture from './CurrentProfilePicture';

type Props = { 
    manager: IManager,
    deleteMediaFormRef: MutableRefObject<HTMLFormElement | null>;
}

export default function DeleteProfilePictureForm({ manager, deleteMediaFormRef } : Props) {

    const action = deleteMediaItem.bind(null, 'managers', manager.MediumId)

    return (
        <form action={ action } ref={ deleteMediaFormRef }>
            <CurrentProfilePicture manager={ manager }/>
        </form>
    )
}
