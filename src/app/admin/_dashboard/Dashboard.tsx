'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { IOneOfCollectionNames, IOneOfCollections } from '@/types'
import CreationDialog from './CreationDialog'
import CollectionGrid from './layout/CollectionGrid'
import CollectionSection from './layout/CollectionSection'
import { IAdminData } from '@/types/admin'

type DialogState = {
    collection: IOneOfCollectionNames | null,
    isOpen: boolean
}

const initialDialogState : DialogState = {
    collection: null,
    isOpen: false
} 

export default function Dashboard({ data } : { data: IAdminData }) {

    return (
        <div className="w-full grid gap-4">
        </div>
    ) 
}
