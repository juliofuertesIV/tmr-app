import { IContest, IContestAssociationIdFieldNames, IContestAssociationKeys, IContestAssociationNames, IContestAssociations } from "@/types/contests"

export const determineIfItemIsAssociatedToContest = ({
    item,
    contest,
    associationKey
} : {
    item: IContestAssociations,
    contest: IContest,
    associationKey: IContestAssociationKeys
    
}) => contest[associationKey]?.some(associatedItem => associatedItem.id === item.id)


export const getAssociationKeyAndIdFieldByName = ({ 
    associationName 
} : { 
    associationName: IContestAssociationNames
}) => {

    const associationKeysAndIdFields : { 
        [key in IContestAssociationNames]: { 
            associationKey: IContestAssociationKeys,
            associationIdField: IContestAssociationIdFieldNames
        }} = {
        params: {
            associationKey: 'Params',
            associationIdField: 'ParamId'
        },
        genres: {
            associationKey: 'Genres',
            associationIdField: 'GenreId'
        },
        social: {
            associationKey: 'SocialMedia',
            associationIdField: 'SocialMediumId'
        }
    }

    return associationKeysAndIdFields[associationName]
}