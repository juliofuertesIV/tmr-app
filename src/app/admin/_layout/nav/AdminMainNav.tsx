'use client'

import React from 'react'
import TMRLogo from '../design/TmrLogo'
import { usePathname } from 'next/navigation'
import { Manager } from '@/types'
import { adminNavSections } from '.'
import NavSection from './NavSection'
import Link from 'next/link'
import LogoutLink from './LogoutLink'
import ProfileLink from './ProfileLink'

export default function AdminMainNav({ manager } : { manager: Manager }) {

    const pathname = usePathname()

    const sectionsByRole = adminNavSections.filter(item => item.minimumRole <= manager.RoleId)

    return (
        <nav className="flex flex-col max-w-fit lg:pl-6 pl-4 lg:py-12 py-6">
            <Link 
               className='opacity-75 data-[active="true"]:pointer-events-none data-[active="true"]:opacity-100 min-h-24 hover:opacity-100'
               href={ '/admin' }
               data-active={ pathname === '/admin' }
            >
                <TMRLogo classname={ 'w-20 max-w-full' }/>
            </Link>
            <menu className="flex flex-col gap-4 text-md py-4">
                <ProfileLink manager={ manager }/>
                {
                    sectionsByRole.map((section, index) => 
                        <NavSection key={ index } section={ section } path={ pathname }/>
                    )
                }
                <LogoutLink/>
            </menu>
        </nav>
    )
}
