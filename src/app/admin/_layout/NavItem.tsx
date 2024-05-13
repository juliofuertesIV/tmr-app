'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SVGProps } from 'react'

type Props = {
    item: {
        href: string,
        label: string,
        Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }
}

export default function NavItem({ item } : Props) {

    const pathname = usePathname()

    const { href, label, Icon } = item 

    return (
        <Link 
            className='flex items-center py-2 px-4  hover:bg-neutral-800 text-sm data-[active="true"]:bg-neutral-900'
            data-active={ pathname === href }
            href={ href }
        >
            <span className='text-xl pr-1'>
            { Icon ? <Icon/> : null }
            </span>
            <span>
            { label }
            </span>
        </Link>
    )
}
