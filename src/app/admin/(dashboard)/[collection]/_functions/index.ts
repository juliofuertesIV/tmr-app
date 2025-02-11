import { CollectionNames } from "@/types"
import CollectionGrid from "../_components/CollectionGrid"
import TagTypesGrid from "../_components/TagTypesGrid"

export const getGridByCollectionName = (collection: CollectionNames) => {

    const gridByCollection = {
        brands: CollectionGrid,
        social: CollectionGrid,
        genres: CollectionGrid,
        managers: CollectionGrid,
        sponsors: CollectionGrid,
        tags: CollectionGrid,
        tagtypes: TagTypesGrid
    }

    return gridByCollection[collection]
}

export const getPageTitleByCollection = (collection: CollectionNames) => {

    const titlesByCollection = {
        brands: 'Marcas',
        social: 'Redes sociales',
        genres: 'Géneros',
        managers: 'Usuarios',
        sponsors: 'Sponsors',
        tags: 'Etiquetas',
        tagtypes: 'Categorías de etiqueta'
    }

    return titlesByCollection[collection]

}
