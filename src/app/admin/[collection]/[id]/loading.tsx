import React from 'react'
import AdminLoader from '../../_layout/design/AdminLoader'

export default function Loading() {
    return (
        <div className='w-full min-h-screen grid place-items-center'>
            <AdminLoader/>
        </div>
    )
}
