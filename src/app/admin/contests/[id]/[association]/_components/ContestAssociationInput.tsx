import { IContestState, IParam, IContest } from '@/types'
import { formInitialState } from '@/lib/forms/feedback/state'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import AssociationIcon from './AssociationIcon'
import { IContestAssociationNames, IContestAssociations, IContestAssociationKeys } from '@/types/associations'
import { disassociateItemsFromContest } from '@/lib/fetch/delete/contests'
import { associateItemToContest } from '@/lib/fetch/post/contests'
import { determineIfItemIsAssociatedToContest } from '../_functions'

type Props = {
    contest: IContest,
    association: IContestAssociationNames,
    associationItem: IContestAssociations,
    associationKey: IContestAssociationKeys
}

export default function ContestAssociationInput({ contest, associationItem, association, associationKey } : Props) {

    const isCurrentlyAssociated = determineIfItemIsAssociatedToContest({ item: associationItem, contest, associationKey })
    
    const boundAssociationAction = associateItemToContest.bind(null, contest.id, association)
    const boundDissociationAction = disassociateItemsFromContest.bind(null, contest.id, association, associationItem.id)

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

    const { description } = (associationItem as IParam | IContestState) || null

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
                    <p className='text-sm uppercase leading-none'>{ (associationItem as any).name }</p> { /* TO DO: FIX IMedia name absence*/ }
                    { description && <p className='text-xs leading-none'>{ description }</p> }
                </div>
                <AssociationIcon loading={ loading } checked={ isCurrentlyAssociated } hovered={ hovered }/>
            </div>
            <form action={ formAction } ref={ form }>
                <input type="hidden" name={ "associationItemId" } value={ associationItem.id }/>
            </form>
        </div>            
    )
}
