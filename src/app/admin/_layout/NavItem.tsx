'use client'
import Link from 'next/link'
import { IAdminNavItem } from '.'

export default function NavItem({ item, path } : { item: IAdminNavItem, path: string }) {

    const { collection, Icon, label } = item

    const isActive = item.isActive(path)

    return (
        <Link 
            className='flex items-center py-2 px-4  hover:bg-neutral-800 text-sm data-[active="true"]:bg-neutral-900'
            data-active={ isActive }
            href={ collection ? `/admin/${collection}` : '/admin' }
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
