import React from 'react'
import { Profile as AddIcon } from '@/app/admin/_layout/design/icons/components/Profile'

export default function MediumPreviewActionIcon({ hasMedium, pending } : { hasMedium: boolean, pending: boolean }) {

    if (pending) return null

    const Icon = hasMedium ? AddIcon : AddIcon // TO DO: oh well

    return (
        <div className='absolute justify-center items-center w-full h-full hidden group-data-[pending="true"]:flex'>
            <Icon className='group-hover:brightness-150 text-gray-400 transition-all'/>
        </div>
    )
}
