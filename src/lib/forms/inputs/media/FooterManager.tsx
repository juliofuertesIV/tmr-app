'use client'

import { IMediaFormField } from '@/types/forms'
import { deleteContestMediaItem } from '@/lib/fetch/delete'
import { IContest } from '@/types'
import MediaInputPreview from './MediaInputPreview'
import FileUploadForm from './FileUploadForm'


export default function FooterManager({ contest } : { contest: IContest }) {

    const footerMediaField : IMediaFormField = {
        role: 'footerElement',
        label: 'Imagen de footer',
        type: 'image'
    }

    const onDiscardFile = async (mediaId?: string) => {
        
        if (!mediaId) return

        await deleteContestMediaItem({ contestId: contest.id as string, mediaId })
    }

    const currentFooterMedia = contest.Media.filter(media => media.role === 'footerElement')

    return (
        <div className='flex flex-col gap-4 w-full justify-start h-full'>
            <div className='grid grid-cols-2 gap-4 w-full max-w-4xl mx-auto'>
                {
                    currentFooterMedia.map((media, index) => {
                        return (
                            <MediaInputPreview 
                                key={ index }
                                file={ media }
                                previewIsCurrentMedia={ true }
                                onDiscardFile={ onDiscardFile }
                            />
                        )
                    })
                }
            </div>
            <FileUploadForm 
                collectionElement={ contest }
                mediaField={ footerMediaField }
                showDatabaseValue={ false }
            />
        </div>
    )
}
