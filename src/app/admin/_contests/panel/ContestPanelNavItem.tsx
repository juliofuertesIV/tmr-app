import React from 'react'
import { IContestSectionName } from './ContestPanel'

type Props = { 
    item: { name: string, value: IContestSectionName }, 
    isActive: boolean,
    onClickNavItem: (value: IContestSectionName) => void
}

export default function ContestPanelNavItem({ item, isActive, onClickNavItem } : Props) {
    return (
        <li 
            className='bg-neutral-700 px-4 py-1 rounded-sm cursor-pointer hover:bg-neutral-700 data-[active="true"]:bg-neutral-900 border-2 border-neutral-500'
            data-active={ isActive }
            onClick={ () => onClickNavItem(item.value) }
        >
            { item.name }
        </li>
    )
}
