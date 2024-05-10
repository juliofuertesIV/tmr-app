'use client'

import { IContest } from '@/interfaces'
import { IMediaFormField } from '@/interfaces/forms'
import { deleteContestMediaItem } from '@/app/_fetch/delete'

export default function FooterManager({ item: contest } : { item: IContest }) {


    const footerMediaField : IMediaFormField = {
        role: 'footerElement',
        label: 'Imagen de footer',
        instructions: 'Tipo svg / png',
        acceptedTypes: 'image/png, image/svg+xml',
        multiple: true,
    }


    const onDeleteFile = async (mediaId: string) => {
        await deleteContestMediaItem({ contestId: contest.id as string, mediaId })
    }


    return (
        <div className='flex flex-col gap-4 w-full justify-start h-full'>

        </div>
    )
}
