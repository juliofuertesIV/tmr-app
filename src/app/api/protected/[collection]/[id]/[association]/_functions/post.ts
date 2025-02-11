import { getAssociationModelByName } from "../../../../contests/[id]/[association]/_utils"
import { CollectionNames } from "@/types"
import { IAssociationNames } from "@/types/associations"

type Props = {
    collection: CollectionNames,
    id: string,
    association: IAssociationNames,
    formData: FormData
}


export const createAssociation = async ({ collection, id, association, formData} : Props) => {
    
    const associationId = formData.get('associationId') as string

    if (!associationId) 
        throw new Error('No associationId field in formData')

    const { 
        AssociationTable,
        collectionItemIdField,
        associationIdField 
    } = getAssociationModelByName(association)

    if (!collectionItemIdField || !AssociationTable) 
        throw new Error('Bad request. Cannot find collectionItemIdField or Association Table.')

    const payload = { [collectionItemIdField]: id, [associationIdField]: associationId } // i. e. ContestId, ParamId

    try {
        return await AssociationTable.create({ ...payload }).then(data => data)
    }
    catch (error) {
        throw new Error('Fallo asociando el elemento.')
    }
}

