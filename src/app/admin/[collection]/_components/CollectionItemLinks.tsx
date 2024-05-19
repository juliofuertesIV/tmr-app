import { IOneOfCollectionNames, IOneOfCollections } from '@/types'
import Link from 'next/link'
import React from 'react'
import { ArrowRightIcon } from '../../_layout/_design/icons/ArrowRightIcon'

export default function CollectionItemLinks({ collection, items } : { collection: IOneOfCollectionNames, items: IOneOfCollections[] }) {
    return items.map((item, index) => {
        return (
            <Link 
                className="bg-neutral-300 text-neutral-800 w-full px-4 py-1 uppercase flex justify-between items-center hover:bg-neutral-50 hover.text-neutral-950 border-2 border-transparent hover:border-green-600"
                key={ index }
                href={ `${ collection }/${ item.id }`}
            >
                <p>
                    { item.name }
                </p>
                <ArrowRightIcon className="max-w-6 text-xl"/>
            </Link>
        )
    })
}
