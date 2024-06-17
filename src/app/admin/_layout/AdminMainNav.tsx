'use client'

import React from 'react'
import NavItem from './NavItem'
import TMRLogo from './_design/TmrLogo'
import { adminNavItems, adminNavItems as links } from '.'
import { usePathname } from 'next/navigation'
import { IManager } from '@/types'

export default function AdminMainNav({ manager } : { manager: IManager }) {

    const pathname = usePathname()

    console.log({ managerRole: manager.RoleId })

    const navItemsByRole = (adminNavItems).filter(item => item.minimumRole <= manager.RoleId)

    return (
        <nav className="flex flex-col bg-neutral-950 w-full max-w-64 border-r border-neutral-600">
            <div className='px-4'>
                <TMRLogo/>
            </div>
            <div className='py-2 pb-4 px-4'>
                <p>Hey, <b className='underline'>{ manager.name }</b></p>
            </div>
            <menu className="flex flex-col uppercase text-sm divide-y divide-neutral-600">
            {
                navItemsByRole.map((item, index) => 
                    <NavItem 
                        key={ index }
                        item={ item }
                        path={ pathname }
                    />
                )
            }
            </menu>
        </nav>
    )
}
