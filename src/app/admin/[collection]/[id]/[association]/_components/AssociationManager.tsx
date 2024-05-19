'use client'

import { IOneOfCollectionNames } from '@/types'
import AssociationInput from './AssociationInput'
import { determineIfItemIsAssociated } from '../_utils'
import { IAssociationTypes, IManyToManyAssociationKeys, IOneOfAssociations, IOneOfCollectionsWithAssociations, ISimpleAssociationKeys } from '@/types/associations'

type Props = {
    collectionItem: IOneOfCollectionsWithAssociations,
    associationItems: IOneOfAssociations[],
    association: IAssociationTypes,
    associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys,
    collection: IOneOfCollectionNames,
    isManyToMany: boolean
}

export default function AssociationManager({ 
    collectionItem,
    associationItems,
    association,
    collection,
    isManyToMany,
    associationKey 
} : Props) {
    
    return (
        <div className=" flex flex-col gap-2 w-full max-w-2xl mx-auto">
            {
                associationItems.map((item, index) => {

                    const isCurrentlyAssociated = determineIfItemIsAssociated({ item, collection, collectionItem, associationKey, isManyToMany })

                    return (
                        <AssociationInput 
                            key={ index }
                            collection={ collection }
                            collectionItem={ collectionItem }
                            association={ association }
                            associationItem={ item }
                            isCurrentlyAssociated={ isCurrentlyAssociated }
                            isManyToMany={ isManyToMany }
                        />
                    )
                })
            }
        </div>
    )
}
