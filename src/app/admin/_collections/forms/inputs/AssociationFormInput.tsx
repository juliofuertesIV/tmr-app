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

    const keyIsManyToMany = (
        associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys
    ) : associationKey is IManyToManyAssociationKeys => 
        isManyToMany === true

    const itemIsChecked = (item: IOneOfAssociations, manyToMany: boolean) => {

        if (itemIsContest(collectionItem)) {

            return manyToMany ? 
            ( collectionItem[associationKey as IManyToManyContestKeys].some(associatedItem => associatedItem.id === item.id) )
            : (collectionItem[associationKey as keyof IContest] === item.id) 
        }
        return true
    }

    if (keyIsManyToMany(associationKey)) return (
        <label className='flex gap-2' key={ associationItem.id }>
            <p>{ associationItem.name }</p>
            <input type='checkbox' defaultChecked={ itemIsChecked(associationItem, true) } name="associationId" value={ associationItem.id }></input>
        </label>
    ) 

    return (
        <label className='flex gap-2' key={ associationItem.id }>
            <p>{ associationItem.name }</p>
            <input type='radio' defaultChecked={ itemIsChecked(associationItem, false) } name="associationId" value={ associationItem.id }></input>
        </label>
    )
}
