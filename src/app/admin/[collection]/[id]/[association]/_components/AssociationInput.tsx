import { disassociateItems } from '@/app/_fetch/delete'
import { associateItems } from '@/app/_fetch/post'
import { IAssociationTypes, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations } from '@/types'
import { formInitialState } from '@/types/forms'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import AssociationIcon from './AssociationIcon'

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
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ hovered, setHovered ] = useState<boolean>(false)

    const form = useRef<HTMLFormElement>(null)

    const onClickItem = () => {
        
        if (isCurrentlyAssociated && !isManyToMany) return
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
            className="bg-neutral-300 text-neutral-600 rounded-sm px-4 py-1 cursor-pointer hover:bg-neutral-100 data-[active='true']:bg-green-400 data-[active='true']:text-neutral-900 data-[active='true']:hover:bg-red-400 data-[loading='true']:pointer-events-none data-[loading='true']:bg-orange-500 "
            data-active={ isCurrentlyAssociated }
            data-loading={ loading }
            style={{
                pointerEvents: (isCurrentlyAssociated && !isManyToMany) || loading ? 'none' : 'auto'
            }}
            onClick={ onClickItem }
            onMouseEnter={ () => manageHoverState(true) }
            onMouseOver={ () => manageHoverState(true) }
            onMouseLeave={ () => manageHoverState(false) }
        >  
            <div className='flex w-full justify-between items-center'>
                <p>{ associationItem.name }</p>
                <AssociationIcon loading={ loading } checked={ isCurrentlyAssociated } hovered={ hovered } isManyToMany={ isManyToMany }/>
            </div>
            <form action={ formAction } ref={ form }>
                <input type="hidden" name="associationId" value={ associationItem.id }/>
                <input type="hidden" name="isManyToMany" value={ `${isManyToMany}` }/>
            </form>
        </div>            
    )
}
