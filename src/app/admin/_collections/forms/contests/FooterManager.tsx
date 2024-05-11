'use client'

import { IContest } from '@/interfaces'
import { IMediaFormField } from '@/interfaces/forms'
import { deleteContestMediaItem } from '@/app/_fetch/delete'
import FilePreview from '../inputs/media/FilePreview'
import FileUploadForm from '../inputs/media/FileUploadForm'

export default function FooterManager({ item: contest } : { item: IContest }) {


    const footerMediaField : IMediaFormField = {
        role: 'footerElement',
        label: 'Imagen de footer',
        instructions: 'Tipo svg / png',
        acceptedTypes: 'image/png, image/svg+xml',
        multiple: true,
    }


    const onDiscardFile = async (mediaId?: string) => {
        
        if (!mediaId) return

        await deleteContestMediaItem({ contestId: contest.id as string, mediaId })
    }

    const currentFooterMedia = contest.Media.filter(media => media.role === 'footerElement')

    return (
        <div className='flex flex-col gap-4 w-full justify-start h-full'>
            <div className='w-full max-w-4xl mx-auto grid grid-cols-4 gap-4'>    
                {
                    currentFooterMedia.map((media, index) => {
                        return (
                            <FilePreview 
                                key={ index }
                                file={ media }
                                previewIsCurrentMedia={ true }
                                onDiscardFile={ onDiscardFile }
                            />
                        )
                    })
                }
            </div>
            <FileUploadForm collectionElement={ contest } mediaField={ footerMediaField }/>
        </div>
    )
}
