import { formInitialState } from '@/lib/forms/feedback/state'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { Association, AssociationKeys, AssociationNames, CollectionsWithAssociationNames, CollectionsWithAssociations } from '@/types/associations'
import AssociationIcon from '@/app/admin/_layout/design/icons/AssociationIcon'
import { associateToCollectionItem } from '@/lib/fetch/post/collections'
import { dissociateFromCollectionItem } from '@/lib/fetch/delete/collections'

type Props = {
    collectionItem: CollectionsWithAssociations,
    associationItem: Association,
    association: AssociationNames
    associationKey: AssociationKeys,
    collection: CollectionsWithAssociationNames,
}

export default function AssociationInput({ 
    collection,
    collectionItem,
    associationItem,
    association,
    associationKey
    
} : Props) {

    const isCurrentlyAssociated = collectionItem[associationKey].some(item => item.id === associationItem.id)

    const boundAssociationAction = associateToCollectionItem.bind(null, collection, collectionItem.id, association)
    const boundDissociationAction = dissociateFromCollectionItem.bind(null, collection, collectionItem.id, association, associationItem.id)
    
    const boundAction = isCurrentlyAssociated ? boundDissociationAction : boundAssociationAction

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
            style={{ pointerEvents: loading ? 'none' : 'auto' }}
            onClick={ onClickItem }
            onMouseEnter={ () => manageHoverState(true) }
            onMouseOver={ () => manageHoverState(true) }
            onMouseLeave={ () => manageHoverState(false) }
        >  
            <div className='flex w-full justify-between items-center py-2'>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm uppercase leading-none'>{ (associationItem as any).name }</p> 
                </div>
                <AssociationIcon loading={ loading } checked={ isCurrentlyAssociated } hovered={ hovered }/>
            </div>
            <form action={ formAction } ref={ form }>
                <input type="hidden" name={ "associationId" } value={ associationItem.id }/>
            </form>
        </div>            
    )
}
