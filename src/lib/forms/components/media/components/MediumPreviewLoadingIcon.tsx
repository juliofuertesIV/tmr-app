import { CogIcon } from '@/app/admin/_layout/design/icons/components/Cog'
import React from 'react'

export default function MediumPreviewLoadingIcon() {
    return (
        <div className='absolute hidden group-data-[pending="true"]:flex justify-center items-center'>
            <CogIcon className='text-3xl animate-spin'/>
        </div>
    )
}
