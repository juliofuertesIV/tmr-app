'use client'

import { IAssociationTypes, IManyToManyAssociationKeys, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations, ISimpleAssociationKeys } from '@/interfaces'
import React from 'react'
import AssociationForm from './AssociationForm'
import { associateItems } from '@/app/_fetch/post'
import AssociationManyToManyForm from './AssociationManyToManyForm'

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
    
    
    if (!isManyToMany) {
        return (
            <AssociationForm
                collection={ collection }
                collectionItem={ collectionItem }
                association={ association }
                associationItems={ associationItems }
                associationKey={ associationKey as ISimpleAssociationKeys }
                isManyToMany={ isManyToMany }
                action={ associateItems }
            />
        )
    }

    return (
        <div>
            {

                <AssociationManyToManyForm
                    collection={ collection }
                    collectionItem={ collectionItem }
                    association={ association }
                    associationItems={ associationItems }
                    associationKey={ associationKey as IManyToManyAssociationKeys }
                    isManyToMany={ isManyToMany }
                />
            }
        </div>
    )
}
