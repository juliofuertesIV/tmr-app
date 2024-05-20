import { IOneOfCollectionNames } from "@/types";

type CollectionTable = {
    [key in IOneOfCollectionNames]: {
        headers: string[],
        fields: string[],
        associations: {
            key: string,
            field: string,
        }[] | null
        buttons: string[]
    }
}

const tables : CollectionTable = {
    contests: {
        headers: ['Nombre'],
        fields: ['name', 'year'],
        associations: [
            { key: 'Brand', field: 'name' },
            { key: 'State', field: 'name' },
        ],
        buttons: ['delete', 'manage']
    },
    brands: {
        headers: ['Nombre'],
        fields: ['name'],
        associations: null,
        buttons: ['delete', 'manage']
    },
    genres: {
        headers: ['Nombre'],
        fields: ['name'],
        associations: null,
        buttons: ['delete', 'manage']
    },
    social: {
        headers: ['Nombre'],
        fields: ['name'],
        associations: null,
        buttons: ['manage']
    }
} 

export const getTableByCollectionName = (collection: IOneOfCollectionNames) => {
    return tables[collection]
}