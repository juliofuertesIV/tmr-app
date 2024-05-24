import { cookies } from 'next/headers'
import React from 'react'
import LogoutForm from './_components/LogoutForm'

async function deleteCurrentSession () {
    'use server'
    return cookies().delete('session')
}

export default async function LogoutPage() {
    
    return (
        <div className='w-full min-h-screen bg-neutral-950 grid place-items-center'>
            <div className='flex flex-col gap-2 bg-neutral-900 p-4 rounded-md'>
                <p>Haz click aquí para cerrar sesión:</p>
                <LogoutForm formAction={ deleteCurrentSession }/>
            </div>
        </div>
    )
}
