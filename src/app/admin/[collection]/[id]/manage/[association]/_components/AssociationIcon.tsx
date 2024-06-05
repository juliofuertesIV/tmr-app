import Spinner from '@/app/admin/_layout/_design/Spinner'
import { CheckIcon } from '@/app/admin/_layout/_design/icons/CheckIcon'
import { CloseIcon } from '@/app/admin/_layout/_design/icons/CloseIcon'
import { PlusIcon } from '@/app/admin/_layout/_design/icons/PlusIcon'
import React from 'react'

type Props = {
    loading: boolean,
    checked: boolean,
    hovered: boolean,
}

export default function AssociationIcon({ loading, checked, hovered } : Props) {

    if (loading) {
        return (
            <div className='max-w-4'>
                <Spinner/>
            </div>
        )
    }

    if (checked && hovered) return <CloseIcon/> 

    if (checked) return <CheckIcon/>
}
