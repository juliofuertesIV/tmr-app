import { contestCreationForm, contestEditForm } from "./contests"

const formsByCollectionName = {
    contests: {
        creation: contestCreationForm,
        edit: contestEditForm
    }
}

export const getFormByActionAndCollectionName = ({ 
    action,
    collection 
} : { 
    action: 'creation',
    collection: 'contests'
}) => formsByCollectionName[collection][action]


export { formsByCollectionName }