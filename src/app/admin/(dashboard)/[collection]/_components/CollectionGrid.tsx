import { AllCollections, CollectionNames } from '@/types'
import React from 'react'
import Link from 'next/link'
import { EditIcon } from '@/app/admin/_layout/design/icons/components/Edit'

export default function CollectionGrid({ items, collection } : { items: AllCollections[], collection: CollectionNames }) {
  return (
    <div className="flex flex-wrap w-full gap-4">
        { 
            items?.map((item, index) => {
                return (
                    <div className='flex gap-2 items-center justify-between w-fit p-4 bg-neutral-800 rounded-xl text-lg' key={ index }>
                        <p className='text-nowrap'>{ item.name }</p>
                        <Link href={ `/admin/${ collection }/${ item.id }`} className='ml-4 p-2 rounded-xl bg-neutral-200 text-neutral-800'><EditIcon/></Link>
                    </div>
                )
            }) 
        }
    </div>
  )
}
