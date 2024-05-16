import { IAssociationTypes, IManyToManyAssociationKeys, ISimpleAssociationKeys } from "@/interfaces"

const associationOptionsByName : {
    [key in IAssociationTypes]: {
        associationKey: ISimpleAssociationKeys | IManyToManyAssociationKeys,
        isManyToMany: boolean
    }
} = {
    params: {
        associationKey: 'Params',
        isManyToMany: true
    },
    genres: {
        associationKey: 'Genres',
        isManyToMany: true
    },
    social: {
        associationKey: 'SocialMedia',
        isManyToMany: true
    },
    states: {
        associationKey: 'StateId',
        isManyToMany: false
    },
    brands: {
        associationKey: 'BrandId',
        isManyToMany: false
    },
}

export const getAssociationOptionsByName = (association: IAssociationTypes) => {
    return associationOptionsByName[association]
}