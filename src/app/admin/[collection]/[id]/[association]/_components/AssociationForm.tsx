'use client'

import { associateItems } from "@/app/_fetch/post"
import { IAssociationTypes, IManyToManyAssociationKeys, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations, ISimpleAssociationKeys } from "@/interfaces"
import { IAPIResponse } from "@/interfaces/api"
import { formInitialState } from "@/interfaces/forms"
import { useFormState } from "react-dom"
import AdminFormFeedback from "../../../../_collections/forms/FormFeedback"
import FormSubmit from "../../../../_collections/forms/FormSubmit"
import AssociationFormInput from "./AssociationFormInput"

type Props = {
    collection: IOneOfCollectionNames,
    collectionItem: IOneOfCollectionsWithAssociations,
    association: IAssociationTypes,
    associationItems: IOneOfAssociations[],
    associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys,
    action: (collection: IOneOfCollectionNames, collectionItemId: string | number, association: IAssociationTypes, prevState: any, formData: FormData) => Promise<IAPIResponse>,
    isManyToMany: boolean
}

export default function AssociationForm({
    collection,
    collectionItem,
    associationItems,
    association,
    isManyToMany,
    associationKey,
    action,
} : Props) {
    

    const boundAction = associateItems.bind(null, collection, collectionItem.id, association)

    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="w-full max-w-xl mx-auto"
            action={ formAction }
        >
            <AdminFormFeedback state={ state }/>
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
            <legend className="uppercase px-2">asdfasdf asdfa sdf </legend>
                {
                    associationItems.map((item, index) => {
                        return (
                            <AssociationFormInput 
                                key={ index }
                                collection={ collection }
                                collectionItem={ collectionItem }
                                association={ association }
                                associationKey={ associationKey }
                                associationItem={ item }
                                isManyToMany={ isManyToMany }
                            />
                        )
                    })
                }
                <input type="hidden" name="isManyToMany" value={ `${isManyToMany}` }/>
            </fieldset>
            <FormSubmit/>
        </form>
    )
}
