'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavItem({ item } : { item: { href: string, label: string }}) {

    const pathname = usePathname()

    const { href, label } = item 

    return (
        <Link 
            className='flex items-center leading-none hover:bg-neutral-800 p-2 text-sm data-[active="true"]:bg-neutral-900'
            data-active={ pathname === href }
            href={ href }
        >
            { label }
        </Link>
    )
}
