'use client'

import { associateItems } from "@/app/_fetch/post"
import { IAssociationTypes, IContest, IManyToManyAssociationKeys, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations, ISimpleAssociationKeys } from "@/interfaces"
import { IAPIResponse } from "@/interfaces/api"
import { useFormState } from "react-dom"

type Props = {
    collectionItem: IOneOfCollectionsWithAssociations,
    collectionItemId: string | number,
    associationItems: IOneOfAssociations[],
    association: IAssociationTypes,
    action: () => Promise<IAPIResponse>,
    associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys,
    collection: IOneOfCollectionNames,
    isManyToMany: boolean
}


export default function AssociationForm({
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

    const itemIsChecked = (item: IOneOfAssociations) => {
        if (itemIsContest(collectionItem)) {
            return collectionItem[associationKey as keyof IContest] === item.id
        }
    }

    const formAction = associateItems.bind(null, 'contests', 'asdfasdf', 'brands')

    const [ state, action ] = useFormState(formAction, null)

    return (
        <form className=" flex flex-col gap-2" action={ action }>
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
