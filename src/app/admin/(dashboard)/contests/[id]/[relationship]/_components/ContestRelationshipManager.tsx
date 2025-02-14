'use client'

import { Contest, ContestRelationship, ContestRelationshipIdFields } from '@/types/contests'
import React from 'react'
import ContestRelationshipInput from './ContestRelationshipInput'

type Props = {

}

export default function ContestRelationshipManager({ 
    contest,
    relationshipItems,
    relationshipIdField
} : {
    contest: Contest,
    relationshipItems: ContestRelationship[],
    relationshipIdField: ContestRelationshipIdFields
}) {
    
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
