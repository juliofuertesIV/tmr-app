import { IBrand, IOneOfCollections } from '@/types'
import Link from 'next/link'
import React from 'react'

export default function BrandGridItem({ item } : { item: IOneOfCollections }) {

    const color = item.foregroundColor
    const bgColor = item.backgroundColor
    const accentColor = item.accentColor

    const brandProperties = {
        '--accentColor': accentColor,
        '--bgColor': bgColor,
        '--fgColor': color        
    } as React.CSSProperties // TO DO: Make function/hook to get css properties / variables out of brand

    return (
        <Link
            href={ `/admin/brands/${item.id}` }
            className={ `flex flex-1 min-w-fit items-center border-2 py-2 cursor-pointer bg-neutral-900 hover:bg-[--bgColor] hover:text-[--fgColor] hover:border-[--accentColor] transition-colors` }
            style={ brandProperties }
        >
            <div className="text-center w-full">
                <h4 className="uppercase leading-none px-2">{ item.name }</h4>
            </div>
        </Link>
    )
}
