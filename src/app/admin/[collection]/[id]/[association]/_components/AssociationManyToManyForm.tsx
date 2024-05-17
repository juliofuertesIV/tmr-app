import { IAssociationTypes, IContest, IManyToManyAssociationKeys, IManyToManyContestKeys, IOneOfAssociations, IOneOfCollectionNames, IOneOfCollectionsWithAssociations } from "@/interfaces"

type Props = {
    collection: IOneOfCollectionNames,
    collectionItem: IOneOfCollectionsWithAssociations,
    association: IAssociationTypes,
    associationItems: IOneOfAssociations[],
    associationKey: IManyToManyAssociationKeys,
    isManyToMany: boolean
}

export default function AssociationManyToManyForm({ 
    collection,
    collectionItem,
    associationItems,
    association,
    isManyToMany,
    associationKey,
} : Props) {


    const itemIsContest = (item: IOneOfCollectionsWithAssociations) : item is IContest => collection === 'contests'

    const itemIsChecked = (item: IOneOfAssociations) => {

        if (itemIsContest(collectionItem)) {
            return collectionItem[associationKey as IManyToManyContestKeys].some(associatedItem => associatedItem.id === item.id)
        }
        return true
    }

    return (
        <div className="flex flex-col gap-2 max-w-xl w-full mx-auto">
            {
                associationItems.map((associationItem, index) => {
                    return (
                        // unchecked input, make checked input too
                        <div 
                            key={ index }
                            className="bg-neutral-300 text-neutral-800 rounded-sm px-4 py-1 cursor-pointer hover:bg-green-400"
                        >
                            <p>{ associationItem.name }</p>
                            <input type="hidden" name="associationId" value={ associationItem.id } defaultChecked={ itemIsChecked(associationItem) }/>
                        </div>
                    )
                })
            }
        </div>
    )
}
