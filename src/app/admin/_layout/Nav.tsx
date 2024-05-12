import Image from 'next/image'
import React from 'react'
import NavItem from './NavItem'

const adminNavItems = [
    { href: '/admin', label: 'Panel' },
    { href: '/admin/contests', label: 'Concursos' },
    { href: '/admin/brands', label: 'Marcas' },
    { href: '/admin/social', label: 'Redes sociales' },
    { href: '/admin/users', label: 'Usuarios' },
    { href: '/admin/logout', label: 'Log out' }
]

export default function Nav() {
    return (
        <nav className="xl:col-span-1 col-span-2 flex flex-col bg-neutral-950">
            <div className='px-4'>
                <Image 
                    className="w-full max-w-full my-4"
                    src={ '/img/tmr_logo.png' }
                    alt='TMR Logo'
                    width={ 150 }
                    height={ 13 }
                />  
            </div>
            <menu className="flex flex-col uppercase text-sm divide-y divide-neutral-600">
            {
                adminNavItems.map((item, index) => <NavItem key={ index } item={ item }/>)
            }
            </menu>
        </nav>
    )
}
