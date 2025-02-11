'use client'

import { Manager } from '@/types'
import React from 'react'
import MediaForm from '@/lib/forms/components/media/MediaForm'

export default function Header({ manager } : { manager: Manager }) {

  return (
        <header>
            <h1><b>Mi perfil</b> <span className='font-light'>{ manager.name }</span></h1>
            <div className='flex flex-col'>
              <p className="italic uppercase text-sm">{ manager.Role.name }</p>
            </div>
            <div className='my-4 max-w-24 max-h-24'>
                <MediaForm collectionItem={ manager } collection='managers' role='profile' previewClassName='rounded-full aspect-square'/>
            </div>
        </header>
  )
}
