'use client'

import React, { useState } from 'react'
import { IAdminNavSection } from '.'
import NavItem from './NavItem'

export default function NavSection({ section, path } : { section: IAdminNavSection, path: string }) {

    const [ open, setIsOpen ] = useState<boolean>(false)

    console.log({ open, label: section.label })

    const { Icon } = section

    return (
        <div className='p-2 py-1'>
            <div 
                className='flex gap-2 items-center cursor-pointer' 
                onClick={ () => setIsOpen(!open) }
            >
                <Icon className='max-w-8'/>
                <p>{ section.label }</p>
            </div>
            <div
                className='data-[show="false"]:max-h-0 max-h-64 transition-all overflow-hidden data-[show="false"]:py-0 pt-2'
                data-show={ open }
            >
            {
                section.items?.map((item, index) => {
                    return <NavItem key={ index } item={ item } path={ path }/>
                })
            }
            </div>

        </div>
    )
}
