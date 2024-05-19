'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)

    }, [error])
    
    return (
        <div className='grid place-items-center w-full min-h-screen'>
            <div className='max-w-xl w-full px-4 py-2 text-center'>
                <h2 className='mb-4 bg-neutral-600 px-4 py-2 rotate-2'>¡Tenemos un error!</h2>
                <p>{ error.message }</p>
                <p>Digest: { error.digest }</p>
                <button
                    className='bg-neutral-200 text-neutral-900 px-4 py-1 rounded-sm my-4'
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                    () => reset()
                    }
                >
                    Intentar de nuevo
                </button>
            </div>
        </div>
    )
}