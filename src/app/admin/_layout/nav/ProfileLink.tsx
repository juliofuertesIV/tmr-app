import React from 'react'
import Link from 'next/link'
import { Manager } from '@/types'
import { profile as Icon } from '../design/icons'

export default function ProfileLink({ manager } : { manager: Manager }) {
  return (
    <Link href={ `/admin/profile/${ manager.id }`} className='flex gap-2 items-center'>
        <Icon className='max-w-8'/>        
        <p className='hidden lg:block'>Mi perfil</p>
    </Link>
  )
}
