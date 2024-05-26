import { IOneOfCollectionNames } from "@/types";

type ICollectionTable = {
    headers: string[],
    fields: string[],
    associations: {
        key: string,
        field: string,
    }[] | null
}

const tables : { [key in IOneOfCollectionNames]: ICollectionTable } = {
    contests: {
        headers: ['Nombre', 'Año', 'Marca', 'Estado'],
        fields: ['name', 'year'],
        associations: [
            { key: 'Brand', field: 'name' },
            { key: 'State', field: 'name' },
        ],
    },
    brands: {
        headers: ['Nombre'],
        fields: ['name'],
        associations: null,
    },
    genres: {
        headers: ['Nombre'],
        fields: ['name'],
        associations: null,
    },
    social: {
        headers: ['Nombre'],
        fields: ['name'],
        associations: null,
    },
    inscriptions: {
        headers: ['Nombre'],
        fields: ['name'],
        associations: null,
    },
    managers: {
        headers: ['Nombre', 'Rol'],
        fields: ['name'],
        associations: [
            { key: 'Role', field: 'name' }
        ],
    }
} 

export const getTableByCollectionName = (collection: IOneOfCollectionNames) : ICollectionTable => {
    return tables[collection]
}