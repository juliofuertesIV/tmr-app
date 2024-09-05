'use client'

import React, { useState } from 'react'
import { IAdminNavSection } from '.'
import NavItem from './NavItem'
import { arrowdown as ArrowIcon } from '../design/icons'

export default function NavSection({ section, path } : { section: IAdminNavSection, path: string }) {

    const [ open, setIsOpen ] = useState<boolean>(false)

    const { Icon } = section

    return (
        <div>
            <div 
                className='flex gap-2 items-center cursor-pointer' 
                onClick={ () => setIsOpen(!open) }
            >
                <Icon className='max-w-8'/>
                <p className='hidden lg:block'>{ section.label }</p>
                <p 
                    data-open={ open }
                    className='data-[open="true"]:rotate-180 transition-transform'
                >
                    <ArrowIcon/>
                </p>
            </div>
            <div
                className='data-[show="false"]:max-h-0 max-h-64 transition-all overflow-hidden data-[show="false"]:py-0 pt-2 lg:pl-6'
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
