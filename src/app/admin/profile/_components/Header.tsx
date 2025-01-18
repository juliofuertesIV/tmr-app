import { IManager } from '@/types'
import React from 'react'
import ProfilePictureModule from './ProfilePictureModule'

export default function Header({ manager } : { manager: IManager }) {
  return (
        <header>
            <h1><b>Mi perfil</b> <span className='font-light'>{ manager.name }</span></h1>
            <div className='flex flex-col'>
              <p className="italic uppercase text-sm">{ manager.Role.name }</p>
            </div>
            <ProfilePictureModule manager={ manager }/>
        </header>
  )
}
