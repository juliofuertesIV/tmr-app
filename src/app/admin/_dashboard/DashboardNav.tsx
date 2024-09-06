import Link from 'next/link'
import React from 'react'

type Props = {
    currentView: string,
    onViewChange: (filter: string) => void
}

export default function DashboardNav({ onViewChange, currentView } : Props) {

    return (
        <nav className='flex gap-2 text-xl'>
            <button 
                data-active={ currentView === 'active' }
                className='tmr-link'
                onClick={ () => onViewChange('active') }
            >
                Activos
            </button>
            <button 
                data-active={ currentView === 'inactive' }
                className='tmr-link'
                onClick={ () => onViewChange('inactive') }
            >
                Inactivos
            </button>
            <button 
                data-active={ currentView === 'crear' }
                className='tmr-link'
                onClick={ () => onViewChange('crear') }
            >
                Crear
            </button>
        </nav>
    )
}
