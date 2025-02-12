import { AllCollections, CollectionNames } from '@/types'
import React from 'react'
import Link from 'next/link'
import { EditIcon } from '@/app/admin/_layout/design/icons/components/Edit'
import { CircleAddIcon } from '@/app/admin/_layout/design/icons/components/CircleAdd'

export default function TagCategoriesGrid({ items: tagTypes, collection } : { items: AllCollections[], collection: CollectionNames }) {
  return (
    <div className="flex flex-col w-full gap-4 max-w-2xl">
        { 
            tagTypes?.map((tagType, index) => {
                return (
                    <article className='flex flex-col gap-2 w-full p-4 bg-neutral-800 rounded-xl text-lg' key={ index }>
                        <header className='flex items-center'>
                            <h3>{ tagType.name }</h3>
                            <Link href={ `/admin/${ collection }/${ tagType.id }`} className='ml-4 p-2 rounded-xl bg-neutral-200 text-neutral-800'><EditIcon/></Link>
                        </header>
                        <div className='flex flex-wrap gap-2 min-h-16 items-center'>
                        {
                            tagType.Tags?.map((tag, tagIndex) => {
                                return (
                                    <Link key={ 't_' + tagIndex } href={ `/admin/tags/${ tag.id }`} className='group'>
                                        <div 
                                            className='w-fit bg-neutral-400 px-2 py-1 rounded-md text-neutral-900 group-hover:bg-neutral-200 group-hover:text-neutral-950 cursor-pointer transition-all'
                                        >
                                            <p>{ tag.name }</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        <button 
                            className='flex items-center gap-1 leading-none bg-green-600 text-neutral-900 rounded-md px-2 py-2 hover:bg-green-500'>
                                Añadir <CircleAddIcon className='text-xl'/>
                            </button>
                        </div>
                    </article>
                )
            }) 
        }
    </div>
  )
}
