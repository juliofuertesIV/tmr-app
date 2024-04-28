import { IBrand } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

export default function BrandCircle({ brand } : { brand: IBrand }) {

    const color = brand.foregroundColor
    const bgColor = brand.backgroundColor
    const accentColor = brand.accentColor

    const brandProperties = {
        '--accentColor': accentColor,
        '--bgColor': bgColor,
        '--fgColor': color        
    } as React.CSSProperties // TO DO: Make function/hook to get css properties / variables out of brand

    return (
        <Link
            href={ `/admin/brands/${brand.id}` }
            className={ `grid items-center border-4 aspect-square cursor-pointer rounded-full w-full max-w-36 bg-neutral-900 hover:bg-[--bgColor] hover:text-[--fgColor] hover:border-[--accentColor] transition-colors` }
            style={ brandProperties }
        >
            <div className="text-center">
                <h4 className="uppercase font-bold leading-snug text-sm px-4">{ brand.name }</h4>
            </div>
        </Link>
    )
}
