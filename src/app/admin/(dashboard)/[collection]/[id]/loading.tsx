import AdminLoader from '@/app/admin/_layout/design/AdminLoader'
import React from 'react'

export default function Loading() {
    return (
        <div className='w-full min-h-screen grid place-items-center'>
            <AdminLoader/>
        </div>
    )
}
