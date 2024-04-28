import { IBrand } from '@/interfaces'
import Link from 'next/link'
import React from 'react'
import BrandCircle from './BrandCircle'

export default function BrandGrid({ brands } : { brands: IBrand[] }) {

    return (
        <div className="grid md:grid-cols-5 grid-cols-2 place-items-center w-full mx-auto gap-4">
        {
            brands.map((brand: IBrand, index: number) => 
                <BrandCircle key={ index } brand={ brand }/>
            )
        }
        </div>
    )
}
