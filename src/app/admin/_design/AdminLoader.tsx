import Image from 'next/image'

export default function AdminLoader() {
  return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex flex-col items-center justify-center gap-8'>
                <Image 
                    className='animate-pulse'
                    src={ '/img/tmr_logo.png' }
                    alt='TMR Logo'
                    width={ 300 }
                    height={ 36 }
                />
                <Image 
                    className='animate-spin w-6 aspect-square'
                    src={ '/img/spinner.png' }
                    alt='Spinner'
                    width={ 58 }
                    height={ 59 }
                />
            </div>
        </div>
    )
}
