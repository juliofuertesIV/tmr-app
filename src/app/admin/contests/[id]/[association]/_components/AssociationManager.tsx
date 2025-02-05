'use client'

import AssociationInput from './AssociationInput'
import { determineIfItemIsAssociated, itemIsRelationship } from '../_utils'
import { ICollectionsWithAssociations, IMedialessRelationshipNames, IMedialessAssociationNames, IMedialessRelationshipIdFieldnames, IContestAssociations, IContestAssociationKeys, IContestAssociationIdFieldnames as IContestAssociationIdFieldNames } from '@/types/associations'

type Props = {
    contest: ICollectionsWithAssociations,
    associationItems: IContestAssociations,
    association: IMedialessAssociationNames | IMedialessRelationshipNames,
    associationKey: IContestAssociationKeys,
    associationIdField: IContestAssociationIdFieldNames,
}

export default function AssociationManager({ 
    contest,
    associationItems,
    association,
    associationKey,
    associationIdField
} : Props) {
    
    return (
        <div className=" flex flex-col gap-2 w-full max-w-2xl mx-auto">
            {
                associationItems.map((item, index) => {

                    const isCurrentlyAssociated = determineIfItemIsAssociated({ item, contest, associationKey, associationIdField })
                    const isRelationship = itemIsRelationship(item, associationKey)

                    return (
                        <AssociationInput 
                            key={ index }
                            isRelationship={ isRelationship }
                            collection={ collection }
                            contest={ contest }
                            association={ association }
                            associationItem={ item }
                            associationIdField={ associationIdField }
                            isCurrentlyAssociated={ isCurrentlyAssociated }
                        />
                    )
                })
            }
        </div>
    )
}
