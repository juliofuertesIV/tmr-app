import Image from 'next/image'

export default function TMRLogo({ classname } : { classname: string }) {
  return (
        <Image 
            className={ classname }
            src={ '/img/tmr_logo.png' }
            alt='TMR Logo'
            width={ 300 }
            height={ 36 }
        />
  )
}
