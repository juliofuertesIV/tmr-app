'use client'

import Image from 'next/image'
import React from 'react'
import NavItem from './NavItem'
import * as Icon from './_design/icons'
import TMRLogo from './_design/TmrLogo'

const adminNavItems = [
    { href: '/admin', label: 'Panel', Icon: Icon.dashboard },
    { href: '/admin/contests', label: 'Concursos', Icon: Icon.contest },
    { href: '/admin/brands', label: 'Marcas', Icon: Icon.brands },
    { href: '/admin/social', label: 'Redes sociales', Icon: Icon.instagram },
    { href: '/admin/users', label: 'Usuarios', Icon: Icon.users },
    { href: '/admin/logout', label: 'Log out', Icon: Icon.logout }
]

export default function Nav() {
    return (
        <nav className="flex flex-col bg-neutral-950 w-full max-w-64">
            <div className='px-4'>
                <TMRLogo/>
            </div>
            <div className='py-2 pb-4 px-4'>
                <p>Hey, <b>USER</b></p>
            </div>
            <menu className="flex flex-col uppercase text-sm divide-y divide-neutral-600">
            {
                adminNavItems.map((item, index) => 
                    <NavItem key={ index } item={ item }/>
                )
            }
            </menu>
        </nav>
    )
}
