import { CircleAddIcon } from '@/app/admin/_layout/design/icons/components/CircleAdd'
import { TrashBinIcon } from '@/app/admin/_layout/design/icons/components/TrashBin'
import React from 'react'

export default function MediumPreviewActionIcon({ hasMedium } : { hasMedium: boolean }) {

    const Icon = hasMedium ? TrashBinIcon : CircleAddIcon 

    return (
        <div className='absolute justify-center items-center w-full h-full hidden group-hover:flex group-data-[pending="true"]:hidden'>
            <Icon className='group-hover:brightness-150 text-gray-400 transition-all text-3xl'/>
        </div>
    )
}
