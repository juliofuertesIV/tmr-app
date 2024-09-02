'use client'
import Link from 'next/link'
import { IAdminNavItem } from '.'

export default function NavItem({ item, path } : { item: IAdminNavItem, path: string }) {

    const { collection, label } = item

    const isActive = item.isActive(path)

    return (
        <Link 
            className='flex items-center py-1 px-4 hover:text-neutral-100 data-[active="true"]:text-neutral-100 text-neutral-400 data-[active="true"]:pointer-events-none cursor-pointer'
            data-active={ isActive }
            href={ collection ? `/admin/${collection}` : '/admin' }
        >
            <span>
                { label }
            </span>
        </Link>
    )
}
