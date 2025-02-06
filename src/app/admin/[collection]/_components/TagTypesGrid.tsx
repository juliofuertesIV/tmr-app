import { IAllCollections, ICollectionNames } from '@/types'
import React from 'react'
import { edit as Icon } from '../../_layout/design/icons/'
import Link from 'next/link'

export default function TagTypesGrid({ items: tagTypes, collection } : { items: IAllCollections[], collection: ICollectionNames }) {
  return (
    <div className="flex flex-col w-full gap-4 max-w-2xl">
        { 
            tagTypes?.map((tagType, index) => {
                return (
                    <article className='flex flex-col gap-2 w-full p-4 bg-neutral-800 rounded-xl text-lg' key={ index }>
                        <header className='flex items-center'>
                            <h3>{ tagType.name }</h3>
                            <Link href={ `/admin/${ collection }/${ tagType.id }`} className='ml-4 p-2 rounded-xl bg-neutral-200 text-neutral-800'><Icon/></Link>
                        </header>
                        <div className='flex flex-wrap gap-2'>
                        {
                            tagType.Tags?.map((tag, tagIndex) => {
                                return (
                                    <div className='w-fit bg-neutral-400 px-2 py-1 rounded-md text-neutral-900' key={ 't_' + tagIndex }>
                                        <p>{ tag.name }</p>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </article>
                )
            }) 
        }
    </div>
  )
}
