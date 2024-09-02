import Image from 'next/image'
import React from 'react'

export default function Spinner() {
    return (
        <Image className='max-w-full animate-spin' src={ '/img/spinner.png' } width={50} height={50} alt='spinner'/>
    )
}
