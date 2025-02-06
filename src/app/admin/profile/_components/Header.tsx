'use client'

import { IManager } from '@/types'
import React from 'react'
import MediaForm from '@/lib/forms/components/media/MediaForm'

export default function Header({ manager } : { manager: IManager }) {

  return (
        <header>
            <h1><b>Mi perfil</b> <span className='font-light'>{ manager.name }</span></h1>
            <div className='flex flex-col'>
              <p className="italic uppercase text-sm">{ manager.Role.name }</p>
            </div>
            <div className='my-4'>
                <MediaForm collectionItem={ manager } collection='managers' role='profile' previewClassName='rounded-full max-w-24 max-h-24 min-h-24 min-w-24'/>
            </div>
        </header>
  )
}
