import { EditIcon } from '@/app/admin/_layout/design/icons/EditIcon'
import { ICollectionNames, IAllCollections } from '@/types'
import Link from 'next/link'
import React from 'react'

type Props = {
    collection: ICollectionNames,
    item: IAllCollections,
    fields: string[],
    associations: { key: string, field: string }[] | null
}

export default function CollectionTableRow({ collection, fields, associations, item } : Props) {
    return (
        <tr
            className="table-row bg-neutral-900 odd:bg-neutral-800"
            key={ item.id }
        >
            { 
                fields.map((field, index) => 
                    <td 
                        className="border border-neutral-600 text-center"
                        key={ index }
                    >
                        {  (item as any)[field as keyof IAllCollections] }
                    </td>
                ) // TO DO: Fields only text, fields with associations types
            }
            {
                associations?.map((association, index) => 
                    <td 
                        className="border border-neutral-600 text-center data-[empty='true']:bg-red-900"
                        key={ index }
                        data-empty={ !(item as any)[association.key] }
                    >
                        { (item as any)[association.key] ? (item as any)[association.key][association.field] : 'No asociado.' }
                    </td>
                )
            }
            <td className="border border-neutral-600">
                <Link 
                    href={ `${collection}/${item.id}` } 
                    className="flex w-full items-center justify-center text-xl hover:text-green-500"
                >
                    <EditIcon/>
                </Link>
            </td>    
        </tr>
    )
}
