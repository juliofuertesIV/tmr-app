'use client'

import React from 'react'
import NavItem from './NavItem'
import TMRLogo from './_design/TmrLogo'
import { adminNavItems as links } from '.'
import { usePathname } from 'next/navigation'


export default function Nav() {

    const pathname = usePathname()

    return (
        <nav className="flex flex-col bg-neutral-950 w-full max-w-64 border-r border-neutral-600">
            <div className='px-4'>
                <TMRLogo/>
            </div>
            <div className='py-2 pb-4 px-4'>
                <p>Hey, <b className='underline'>USER</b></p>
            </div>
            <menu className="flex flex-col uppercase text-sm divide-y divide-neutral-600">
            {
                links.map((item, index) => 
                    <NavItem 
                        key={ index }
                        item={ item }
                        isActive={ item.isActive(pathname) }
                    />
                )
            }
            </menu>
        </nav>
    )
}
