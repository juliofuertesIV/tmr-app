
import { associateItems } from '@/app/_fetch/post'
import { IAssociationTypes, IContest, IManyToManyAssociationKeys, IManyToManyContestKeys, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations, ISimpleAssociationKeys } from '@/interfaces'
import React from 'react'
import TestComponent from './AssociationForm'
import AssociationForm from './AssociationForm'

type Props = {
    collectionItem: IOneOfCollectionsWithAssociations,
    associationItems: IOneOfAssociations[],
    association: IAssociationTypes,
    associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys,
    collection: IOneOfCollectionNames,
    isManyToMany: boolean
}

export default function AssociationManager({ 
    collectionItem,
    associationItems,
    association,
    collection,
    isManyToMany,
    associationKey 
} : Props) {
    
    const itemIsContest = (item: IOneOfCollectionsWithAssociations) : item is IContest => {
        return collection === 'contests'
    }

    const formAction = associateItems.bind(null, collection, collectionItem.id, association)

    if (isManyToMany) return (
        <form className=" flex flex-col gap-2">
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
            <legend className="uppercase px-2">asd asdf asdf ads</legend>
                {
                    associationItems.map(item => {
                        return (
                            <label className='flex gap-2' key={ item.id }>
                                <p>{ item.name }</p>
                                <input type='checkbox'></input>
                            </label>
                        )
                    })
                }
            </fieldset>
        </form>
    )

    const itemIsChecked = (item: IOneOfAssociations) => {

        if (itemIsContest(collectionItem)) {
            return collectionItem[associationKey as keyof IContest] === item.id
        }
    }

    return (
        
        <form className=" flex flex-col gap-2">
            {/* <AssociationForm action={ associateItems }/> */}
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
            <legend className="uppercase px-2">asdfasdf asdfa sdf </legend>
                {
                    associationItems.map(item => {
                        return (
                            <label className='flex gap-2' key={ item.id }>
                                <p>{ item.name }</p>
                                <input type='radio' defaultChecked={ itemIsChecked(item) }></input>
                            </label>
                        )
                    })
                }
            </fieldset>
        </form>        
    )
}
