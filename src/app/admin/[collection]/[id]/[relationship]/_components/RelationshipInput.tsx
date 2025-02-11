import { CollectionNames } from '@/types'
import { formInitialState } from '@/lib/forms/feedback/state'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { ICollectionsWithAssociations, IMedialessRelationship, IMedialessRelationshipIdFieldnames, IMedialessRelationshipNames } from '@/types/associations'
import { updateCollectionItem } from '@/lib/fetch/put/collections'

type Props = {
    collection: CollectionNames,
    collectionItem: ICollectionsWithAssociations,
    /* relationship: IMedialessRelationshipNames, */
    relationshipItem: IMedialessRelationship,
    relationshipIdField: IMedialessRelationshipIdFieldnames,
    isCurrentlyAssociated: boolean,
}

export default function RelationshipInput({ 
    collection,
    collectionItem,
    relationshipItem,
    relationshipIdField,
    isCurrentlyAssociated,
    /* relationship, */
    
} : Props) {


    const boundAction = updateCollectionItem.bind(null, collection, collectionItem.id)

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


    const manageHoverState = (hovered: boolean) => setHovered(hovered)

    return (
        <div 
            className="bg-neutral-300 text-neutral-800 rounded-sm px-4 py-1 cursor-pointer hover:bg-neutral-100 data-[active='true']:bg-green-400 data-[active='true']:text-neutral-900 data-[active='true']:hover:bg-red-400 data-[loading='true']:pointer-events-none data-[loading='true']:bg-orange-500 "
            data-active={ isCurrentlyAssociated }
            data-loading={ loading }
            style={{ pointerEvents: isCurrentlyAssociated ? 'none' : (loading ? 'none' : 'auto') }}
            onClick={ onClickItem }
            onMouseEnter={ () => manageHoverState(true) }
            onMouseOver={ () => manageHoverState(true) }
            onMouseLeave={ () => manageHoverState(false) }
        >  
            <div className='flex w-full justify-between items-center py-2'>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm uppercase leading-none'>{ relationshipItem.name }</p> { /* TO DO: FIX IMedia name absence*/ }
                </div>
                {/* <AssociationIcon loading={ loading } checked={ isCurrentlyAssociated } hovered={ hovered }/> */}
            </div>
            <form action={ formAction } ref={ form }>
                <input type="hidden" name={ relationshipIdField } value={ relationshipItem.id }/>
            </form>
        </div>            
    )
}
