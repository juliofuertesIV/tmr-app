import React from 'react'
import { IContestMediaRole } from '@/types/media'
import MediaForm from '@/lib/forms/components/media/MediaForm'
import { Contest } from '@/types/contests';

const contestMediaFields : {
    label: string,
    instructions: string,
    role: IContestMediaRole,
    previewClassName: React.ComponentProps<'div'>['className'];
}[] = [
    {
        label: 'Elige un logo',
        instructions: 'Elige un archivo menor de 2mb. Formato .png, .svg, .webp',
        role: 'logo',
        previewClassName: 'aspect-video rounded-sm w-full h-fit'
    },
    {
        label: 'Elige un marco',
        instructions: 'Elige un archivo menor de 2mb. Formato .png, .svg, .webp',
        role: 'frame',
        previewClassName: 'aspect-square rounded-sm w-full h-fit'
    },
    {
        label: 'Elige un banner',
        instructions: 'Elige un archivo menor de 2mb. Relación de aspecto: 1200x1630. Aceptamos .png, .svg, .webp',
        role: 'banner',
        previewClassName: 'rounded-sm w-full h-full'
    },
    {
        label: 'Elige un favicon',
        instructions: 'Elige un archivo menor de 2mb. Formato .ico',
        role: 'favicon',
        previewClassName: 'aspect-square rounded-sm w-10 h-10'
    },
]

export default function ContestMediaManager({ contest } : { contest: Contest }) {

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
