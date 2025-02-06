import path from "path";

export const getFolderByCollectionName = ({ 
    collection,
    domain 
} : { 
    collection: 'contests' | 'managers' | 'inscriptions' | 'sponsors',
    domain: string | null
}) : { 
    folder: string | null,
    error: string | null 
} => {

    if (!collection) return { folder: null, error: 'No collection added' }

    if (collection === 'contests' || collection === 'inscriptions') {

        if (!domain) return { folder: null, error: 'No domain added for collection: ' + collection } 

        return { folder: `${ domain }/${ collection }`, error: null }

    } else {

        return { folder: collection, error: null }

    }
}

export const produceFileName = (fileName: string) => crypto.randomUUID() + "-" + new Date().getTime() + path.extname(fileName);
