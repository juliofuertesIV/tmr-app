import React from 'react'
import { alert as AlertIcon, check as CheckIcon } from '@/app/admin/_layout/design/icons'

export default function LabelIcon({ isValid } : { isValid: boolean | null }) {

    if (isValid === null) return null

    if (isValid) return <CheckIcon className='text-green-500'/>
    
    return <AlertIcon className='text-red-800'/> 
  
}
