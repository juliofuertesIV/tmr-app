import React from 'react'

type Props = { 
    item: { name: string, value: string }, 
    isActive: boolean,
    className: string,
    onClickNavItem: (value: string) => void
}

export default function PanelNavItem({ item, isActive, className, onClickNavItem } : Props) {
    return (
        <li 
            className={ className }
            data-active={ isActive } 
            onClick={ () => onClickNavItem(item.value) }
        >
            { item.name }
        </li>
    )
}
