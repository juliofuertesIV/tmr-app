import { disassociateItems } from '@/app/_fetch/delete'
import { associateItems } from '@/app/_fetch/post'
import AdminFormFeedback from '@/app/admin/_collections/forms/FormFeedback'
import { IAssociationTypes, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations } from '@/interfaces'
import { formInitialState } from '@/interfaces/forms'
import React, { useRef } from 'react'
import { useFormState } from 'react-dom'

type Props = {
    collection: IOneOfCollectionNames,
    collectionItem: IOneOfCollectionsWithAssociations,
    association: IAssociationTypes,
    associationItem: IOneOfAssociations,
    isCurrentlyAssociated: boolean,
    isManyToMany: boolean
}

export default function AssociationInput({ 
    collection,
    collectionItem,
    associationItem,
    isCurrentlyAssociated,
    association,
    isManyToMany
} : Props) {


    const boundAssociationAction = associateItems.bind(null, collection, collectionItem.id, association)
    const boundDissociationAction = disassociateItems.bind(null, collection, collectionItem.id, association, associationItem.id)
    const boundAction = isCurrentlyAssociated ? boundDissociationAction : boundAssociationAction

    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    const form = useRef<HTMLFormElement>(null)

    const onClickItem = () => {
        
        if (isCurrentlyAssociated && !isManyToMany) return // can't set null to StateId

        form.current?.requestSubmit()
    }

    return (
        <div 
            className="bg-neutral-300 text-neutral-600 rounded-sm px-4 py-1 cursor-pointer hover:bg-neutral-100 data-[active='true']:bg-green-400 data-[active='true']:text-neutral-900 data-[active='true']:hover:bg-red-400"
            data-active={ isCurrentlyAssociated }
            style={{
                pointerEvents: isCurrentlyAssociated && !isManyToMany ? 'none' : 'auto'
            }}
            onClick={ onClickItem }
        >
            <AdminFormFeedback state={ state }/>
            <p>{ associationItem.name }</p>
            <form action={ formAction } ref={ form }>
                <input type="hidden" name="associationId" value={ associationItem.id }/>
                <input type="hidden" name="isManyToMany" value={ `${isManyToMany}` }/>
            </form>
        </div>            
    )
}
