
export type IFormField = {
    name: string,
    label: string,
    required: boolean,
    type: string
}

export type IFormAction = (prevState: any, formData: FormData, id?: string) => Promise<FormState>

export type CreationFormByCollectionName = {
    fields: IFormField[],
    action: IFormAction
}

export type FormState = {
    message: string,
    success: boolean,
    error: any | null,
    data: any | null
}
