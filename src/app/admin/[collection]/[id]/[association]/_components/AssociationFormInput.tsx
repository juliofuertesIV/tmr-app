import { IAssociationTypes, IContest, IManyToManyAssociationKeys, IManyToManyContestKeys, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollections, IOneOfCollectionsWithAssociations, ISimpleAssociationKeys } from '@/interfaces'
import React from 'react'

type Props = {
    collection: IOneOfCollectionNames,
    collectionItem: IOneOfCollectionsWithAssociations,
    association: IAssociationTypes,
    associationItem: IOneOfAssociations,
    associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys,
    isManyToMany: boolean
}

export default function AssociationFormInput({ 
    collection,
    collectionItem,
    associationItem,
    association,
    isManyToMany,
    associationKey,
} : Props) {

    const itemIsContest = (item: IOneOfCollectionsWithAssociations) : item is IContest => collection === 'contests'

    const itemIsChecked = (item: IOneOfAssociations) => {

        if (itemIsContest(collectionItem)) return collectionItem[associationKey as keyof IContest] === item.id

        return true
    }

    return (
        <label className='flex gap-2'>
            <p>{ associationItem.name }</p>
            <input type='radio' defaultChecked={ itemIsChecked(associationItem) } name="associationId" value={ associationItem.id }></input>
        </label>
    )
}
