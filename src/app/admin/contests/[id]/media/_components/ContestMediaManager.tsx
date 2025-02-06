import React from 'react'
import { IContest } from '@/types'
import { IContestMediaRole } from '@/types/media'
import MediaForm from '@/lib/forms/components/media/MediaForm'

const contestMediaFields : {
    label: string,
    instructions: string,
    role: IContestMediaRole,
    previewClassName: React.ComponentProps<'div'>['className'];
}[] = [
    {
        label: 'Elige un logo',
        instructions: 'Elige un archivo menor de 2mb.',
        role: 'logo',
        previewClassName: 'aspect-square rounded-sm'
    },
    {
        label: 'Elige un marco',
        instructions: 'Elige un archivo menor de 2mb.',
        role: 'frame',
        previewClassName: 'aspect-square rounded-sm'
    },
    {
        label: 'Elige un banner',
        instructions: 'Elige un archivo menor de 2mb.',
        role: 'banner',
        previewClassName: 'aspect-square rounded-sm'
    },
    {
        label: 'Elige un favicon',
        instructions: 'Elige un archivo menor de 2mb.',
        role: 'favicon',
        previewClassName: 'aspect-square rounded-sm'
    },
]

export default function ContestMediaManager({ contest } : { contest: IContest }) {

    return (
        <div className="grid lg:grid-cols-4 gap-4 lg:max-w-5xl">
            {
                contestMediaFields.map((field, index) => 
                    <div key={ index }>
                        <h2>{ field.label }</h2>
                        <small>{ field.instructions }</small>
                        <MediaForm
                            collection='contests'
                            previewClassName={ field.previewClassName }
                            collectionItem={ contest }
                            domain={ contest.domain }
                            role={ field.role }
                        />
                    </div>
                )
            }
        </div>
    )
}
