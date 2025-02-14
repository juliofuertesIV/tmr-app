/* import { AssociationNames, CollectionsWithAssociationNames } from "@/types/associations"
import { getAssociationTableAndFieldByName } from "."


type Props = {
    collection: CollectionsWithAssociationNames,
    id: string,
    association: AssociationNames,
    formData: FormData
}


export const createCollectionAssociation = async ({ collection, id, association, formData} : Props) => {
    
    const associationId = formData.get('associationId') as string

    if (!associationId) 
        throw new Error('No associationId field in formData')

    const { 
        AssociationTable,
        collectionItemIdField,
        associationIdField 
    } = getAssociationTableAndFieldByName(association)

    if (!collectionItemIdField || !AssociationTable) 
        throw new Error('Bad request. Cannot find collectionItemIdField or Association Table.')

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId } // i. e. FooterId, SponsorId

    
    return await AssociationTable.create({ ...payload })
    .then(data => data)
    .catch(error => { throw new Error(error as string )})

}

 */