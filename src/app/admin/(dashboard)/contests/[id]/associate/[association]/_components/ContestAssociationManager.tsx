'use client'

import { ContestAssociationIdFieldNames, ContestAssociationKeys, ContestAssociationNames, ContestAssociations } from '@/types/contests'
import ContestAssociationInput from './ContestAssociationInput'
import { IContest } from '@/types'

type Props = {
    contest: IContest,
    associationItems: ContestAssociations[],
    association: ContestAssociationNames,
    associationKey: ContestAssociationKeys,
    associationIdField: ContestAssociationIdFieldNames,
}

export default function ContestAssociationManager({ 
    contest,
    associationItems,
    association,
    associationKey,
} : Props) {
    
    return (
        <div className="flex flex-col gap-2 w-full max-w-2xl">
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
