import Spinner from '@/app/admin/_layout/design/Spinner'
import { Check } from '@/app/admin/_layout/design/icons/components/Check'
import { Close } from '@/app/admin/_layout/design/icons/components/Close'

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

    if (checked && hovered) return <Close/> 

    if (checked) return <Check/>
}
