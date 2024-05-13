'use client'
import Link from 'next/link'
import { SVGProps } from 'react'

type Props = {
    item: {
        href: string,
        label: string,
        Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    },
    isActive: boolean
}

export default function NavItem({ item, isActive } : Props) {

    const { href, Icon, label } = item

    return (
        <Link 
            className='flex items-center py-2 px-4  hover:bg-neutral-800 text-sm data-[active="true"]:bg-neutral-900'
            data-active={ isActive }
            href={ href }
        >
            <span className='text-xl pr-1'>
            <Icon/>
            </span>
            <span>
            { label }
            </span>
        </Link>
    )
}
