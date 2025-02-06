'use client'

import { IContestRelationship, IContestRelationshipIdFields, IContestRelationshipNames } from '@/types/contests'
import React from 'react'
import ContestRelationshipInput from './ContestRelationshipInput'
import { IContest } from '@/types'

type Props = {
    contest: IContest,
    relationshipItems: IContestRelationship[],
    relationship: IContestRelationshipNames,
    relationshipIdField: IContestRelationshipIdFields
}

export default function ContestRelationshipManager({ 
    contest,
    relationshipItems,
    relationship,
    relationshipIdField
} : Props) {
    
    return (
        <div className="flex flex-col gap-2 w-full max-w-2xl">
            {
                relationshipItems.map((item, index) => {

                    return (
                        <ContestRelationshipInput
                            key={ index }                           
                            contest={ contest }
                            relationshipItem={ item }
                            relationshipIdField={ relationshipIdField }
                        />
                    )
                })
            }
        </div>
    )
}
