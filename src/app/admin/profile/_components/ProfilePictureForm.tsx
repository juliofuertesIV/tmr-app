'use client'

import React, { MutableRefObject } from 'react'

type Props = { 
    inputRef: MutableRefObject<HTMLInputElement | null>;
}

export default function ProfilePictureForm({ inputRef } : Props) {

    return (
        <form className='hidden'>
            <input 
                ref={ inputRef } 
                type="file" 
                name="Media" 
                id="" 
            />
        </form>
    )
}
