import { decryptJWT } from '@/auth'
import { cookies } from 'next/headers'
import React from 'react'


async function deleteCurrentSession () {
    'use server'
    cookies().delete('session')
}


export default async function LogoutPage() {


    const currentSession = cookies().get('session')
    
    const manager = !!currentSession?.value ? await decryptJWT(currentSession.value) : null


    return (
        <div className='w-full min-h-screen bg-neutral-950 grid place-items-center'>
            {
                !!manager ? 
                <form action={ deleteCurrentSession }>
                    <input 
                        className='bg-neutral-200 text-neutral-800 px-4 py-1 rounded-sm'
                        type="submit" 
                        value={ 'Cerrar sesión' } 
                    />
                </form>
                : 
                <p>No hay ninguna sesión iniciada.</p>
            }
        </div>
    )
}
