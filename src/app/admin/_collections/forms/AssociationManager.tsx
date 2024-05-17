'use client'

import { IAssociationTypes, IManyToManyAssociationKeys, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations, ISimpleAssociationKeys } from '@/interfaces'
import React from 'react'
import AssociationForm from './AssociationForm'
import { associateItems } from '@/app/_fetch/post'

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
        <AssociationForm
            collection={ collection }
            collectionItem={ collectionItem }
            association={ association }
            associationItems={ associationItems }
            associationKey={ associationKey }
            isManyToMany={ isManyToMany }
            action={ associateItems }
        />
    )
}
