import React from 'react'
import { logout as Icon } from '../design/icons'
import Link from 'next/link'
export default function LogoutLink() {
  return (
    <Link href="/admin/logout" className='flex p-2 gap-2 items-center'>
        <div>
            <Icon className='max-w-8'/>
        </div>
        <p>Logout</p>
    </Link>
  )
}