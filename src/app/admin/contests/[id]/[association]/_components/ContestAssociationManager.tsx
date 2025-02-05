'use client'

import ContestAssociationInput from './ContestAssociationInput'
import { IContestAssociations, IContestAssociationKeys, IContestAssociationIdFieldNames, IContestAssociationNames } from '@/types/associations'
import { IContest } from '@/types'

type Props = {
    contest: IContest,
    associationItems: IContestAssociations[],
    association: IContestAssociationNames,
    associationKey: IContestAssociationKeys,
    associationIdField: IContestAssociationIdFieldNames,
}

export default function ContestAssociationManager({ 
    contest,
    associationItems,
    association,
    associationKey,
} : Props) {
    
    return (
        <div className=" flex flex-col gap-2 w-full max-w-2xl mx-auto">
            {
                associationItems.map((item, index) => {

                    return (
                        <ContestAssociationInput 
                            key={ index }
                            contest={ contest }
                            association={ association }
                            associationItem={ item }
                            associationKey={ associationKey }
                        />
                    )
                })
            }
        </div>
    )
}
