import { ICollectionNames } from "@/types";
import { IAssociationNames } from "@/types/associations";
import { handleApiError } from "@/errors";
import { deleteAssociation } from "./_functions/delete";

type Params = { params: { collection: ICollectionNames, id: string, association: IAssociationNames, associationId: string }}

export const DELETE = async (req: Request, { params } : Params) => {

    const formData = await req.formData()

    const { collection, id, association, associationId } = params

    const isManyToMany = formData.get('isManyToMany')

    if (isManyToMany === null) {
        return await handleApiError({
            message: 'Type of relationship (many to many, simple) not specified.',
            error: new Error('isManyToMany missing.'),
            route: `/api/${ collection }/${ id }/${ association }/${ associationId }`,
            collection
        })
    }

    return await deleteAssociation({ collection, id, association, associationId, isManyToMany, formData })


}
