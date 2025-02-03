import { ICollectionNames } from "@/types";

type ICollectionTable = {
    headers: string[],
    fields: string[],
    associations: {
        key: string,
        field: string,
    }[] | null
}

const tables : { [key in Exclude<ICollectionNames, "media">]: ICollectionTable } = {
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
        headers: ['Nombre', 'Contacto'],
        fields: ['name', 'contact'],
        associations: null,
    },
    managers: {
        headers: ['Nombre', 'Rol'],
        fields: ['name'],
        associations: [
            { key: 'Role', field: 'name' }
        ],
    },
    sponsors: {
        headers: ['Nombre'],
        fields: ['name'],
        associations: null
    }
} 

export const getTableByCollectionName = (collection: Exclude<ICollectionNames, "media">) : ICollectionTable => {
    return tables[collection]
}