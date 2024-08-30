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
                className='text-neutral-400 data-[active="true"]:text-neutral-100 data-[active="true"]:underline decoration-green-600 underline-offset-4'
                onClick={ () => onViewChange('active') }
            >
                Activos
            </button>
            <button 
                data-active={ currentView === 'inactive' }
                className='text-neutral-400 data-[active="true"]:text-neutral-100 data-[active="true"]:underline decoration-red-800 underline-offset-4'
                onClick={ () => onViewChange('inactive') }
            >
                Inactivos
            </button>
            <button 
                data-active={ currentView === 'crear' }
                className='text-neutral-400 data-[active="true"]:text-neutral-100 data-[active="true"]:underline decoration-green-600 underline-offset-4'
                onClick={ () => onViewChange('crear') }
            >
                Crear
            </button>
        </nav>
    )
}
