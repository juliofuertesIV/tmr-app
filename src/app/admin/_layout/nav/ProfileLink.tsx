import React from 'react'
import Link from 'next/link'
import { IManager } from '@/types'
import { profile as Icon } from '../design/icons'

export default function ProfileLink({ manager } : { manager: IManager }) {
  return (
    <Link href={ `/admin/profile/${ manager.id }`} className='flex p-2 gap-2 items-center'>
        <Icon className='max-w-8'/>        
        <p>Mi perfil</p>
    </Link>
  )
}