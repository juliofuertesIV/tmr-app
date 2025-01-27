import { IContestState, ICollectionNames, IParam } from '@/types'
import { formInitialState } from '@/lib/forms/feedback/state'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import AssociationIcon from './AssociationIcon'
import { IAssociationIdFieldnames, IAssociationNames, IAssociation, ICollectionsWithAssociations, IRelationshipIdFieldnames, IRelationshipNames, IRelationship } from '@/types/associations'
import { associateItems } from '@/lib/fetch/post/collections'
import { disassociateItems } from '@/lib/fetch/delete/media'
import { updateCollectionItem } from '@/lib/fetch/put/collections'

type Props = {
    collection: ICollectionNames,
    collectionItem: ICollectionsWithAssociations,
    association: IAssociationNames | IRelationshipNames,
    associationItem: IAssociation | IRelationship,
    associationIdField: IAssociationIdFieldnames | IRelationshipIdFieldnames,
    isCurrentlyAssociated: boolean,
    isRelationship: boolean
}

export default function AssociationInput({ 
    collection,
    collectionItem,
    associationItem,
    associationIdField,
    isCurrentlyAssociated,
    isRelationship,
    association,
    
} : Props) {


    const boundAssociationAction = associateItems.bind(null, collection, collectionItem.id, association as IAssociationNames)
    const boundDissociationAction = disassociateItems.bind(null, collection, collectionItem.id, association as IAssociationNames, associationItem.id)
    const boundRelationshipAction = updateCollectionItem.bind(null, collection, collectionItem.id)

    const boundAction = isRelationship ? boundRelationshipAction : (isCurrentlyAssociated ? boundDissociationAction : boundAssociationAction)

    const [ state, formAction ] = useFormState(boundAction, formInitialState)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ hovered, setHovered ] = useState<boolean>(false)

    const form = useRef<HTMLFormElement>(null)

    const onClickItem = () => {
                
        setLoading(true)

        form.current?.requestSubmit()
    }

    useEffect(() => {

        if (state.success) {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }

    }, [ state ])

    const { description } = (associationItem as IParam | IContestState) || null

    const manageHoverState = (hovered: boolean) => setHovered(hovered)

    if (association === 'media') return null

    return (
        <div 
            className="bg-neutral-300 text-neutral-800 rounded-sm px-4 py-1 cursor-pointer hover:bg-neutral-100 data-[active='true']:bg-green-400 data-[active='true']:text-neutral-900 data-[active='true']:hover:bg-red-400 data-[loading='true']:pointer-events-none data-[loading='true']:bg-orange-500 "
            data-active={ isCurrentlyAssociated }
            data-loading={ loading }
            style={{ pointerEvents: isCurrentlyAssociated && isRelationship ? 'none' : (loading ? 'none' : 'auto') }}
            onClick={ onClickItem }
            onMouseEnter={ () => manageHoverState(true) }
            onMouseOver={ () => manageHoverState(true) }
            onMouseLeave={ () => manageHoverState(false) }
        >  
            <div className='flex w-full justify-between items-center py-2'>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm uppercase leading-none'>{ (associationItem as any).name }</p> { /* TO DO: FIX IMedia name absence*/ }
                    { description && <p className='text-xs leading-none'>{ description }</p> }
                </div>
                <AssociationIcon loading={ loading } checked={ isCurrentlyAssociated } hovered={ hovered }/>
            </div>
            <form action={ formAction } ref={ form }>
                { /* TO DO: ALL WITH VARIABLE associationkey */ }
                <input type="hidden" name={ isRelationship ? associationIdField : "associationId" } value={ associationItem.id }/>
            </form>
        </div>            
    )
}
