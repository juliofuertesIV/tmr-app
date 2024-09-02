'use client'

import React from 'react'
import TMRLogo from '../design/TmrLogo'
import { usePathname } from 'next/navigation'
import { IManager } from '@/types'
import { adminNavSections } from '.'
import NavSection from './NavSection'
import Link from 'next/link'
import LogoutLink from './LogoutLink'
import ProfileLink from './ProfileLink'

export default function AdminMainNav({ manager } : { manager: IManager }) {

    const pathname = usePathname()

    const sectionsByRole = adminNavSections.filter(item => item.minimumRole <= manager.RoleId)

    return (
        <nav className="flex flex-col bg-neutral-950 w-full max-w-64 border-r border-neutral-600">
            <Link 
               className='p-4 data-[active="true"]:pointer-events-none min-h-24'
               href={ '/admin' }
               data-active={ pathname === '/admin' }
            >
                <TMRLogo classname={ 'w-24 max-w-full min-h-full' }/>
            </Link>
            <menu className="flex flex-col gap-2">
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
