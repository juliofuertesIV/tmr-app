import { Contest, ContestAssociationIdFieldNames, ContestAssociationKeys, ContestAssociationNames, ContestAssociations } from "@/types/contests"

export const determineIfItemIsAssociatedToContest = ({
    item,
    contest,
    associationKey
} : {
    item: ContestAssociations,
    contest: Contest,
    associationKey: ContestAssociationKeys
    
}) => contest[associationKey]?.some(associatedItem => associatedItem.id === item.id) || false


export const getAssociationKeyAndIdFieldByName = ({ 
    associationName 
} : { 
    associationName: ContestAssociationNames
}) => {

    const associationKeysAndIdFields : { 
        [key in ContestAssociationNames]: { 
            associationKey: ContestAssociationKeys,
            associationIdField: ContestAssociationIdFieldNames
        }} = {
        params: {
            associationKey: 'Params',
            associationIdField: 'ParamId'
        },
        social: {
            associationKey: 'SocialMedia',
            associationIdField: 'SocialMediumId'
        }
    }

    return associationKeysAndIdFields[associationName]
}