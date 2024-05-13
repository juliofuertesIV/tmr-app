import Image from 'next/image'

export default function TMRLogo() {
  return (
        <Image 
            className="w-full max-w-[300px] my-4"
            src={ '/img/tmr_logo.png' }
            alt='TMR Logo'
            width={ 300 }
            height={ 36 }
        />
  )
}
