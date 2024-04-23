import { ValidationError } from "sequelize"
import { IOneOfCollectionNames, IOneOfCollections } from "."

export type ICreationFormField = {
    name: string,
    label: string,
    required: boolean,
    type: string,
    defaultValue?: string
}

export type IEditionFormField = {
    name: string,
    label: string,
    required: boolean,
    type: string
}

export type IFormCreationAction = (collection: IOneOfCollectionNames, prevState: any, formData: FormData) => Promise<IAPIResponse>

export type IFormEditionAction = (collection: IOneOfCollectionNames, id: string, prevState: any, formData: FormData) => Promise<IAPIResponse>

export type ICreationFormByCollectionName = {
    fields: ICreationFormField[],
    action: IFormCreationAction
}

export type IEditionFormByCollectionName = {
    fields: IEditionFormField[],
    action: IFormEditionAction
}

export type IAPIResponse = {
    message: string,
    success: boolean,
    error: ValidationError | null,
    data: any | null
}
