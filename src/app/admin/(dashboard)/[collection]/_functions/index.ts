import { CollectionNames } from "@/types"
import CollectionGrid from "../_components/CollectionGrid"
import TagCategoriesGrid from "../_components/TagTypesGrid"

export const getGridByCollectionName = (collection: CollectionNames) => {

    const gridByCollection = {
        brands: CollectionGrid,
        social: CollectionGrid,
        managers: CollectionGrid,
        sponsors: CollectionGrid,
        footers: CollectionGrid,
        tags: CollectionGrid,
        tagCategories: TagCategoriesGrid
    }

    return gridByCollection[collection]
}

export const getPageTitleByCollection = (collection: CollectionNames) => {

    const titlesByCollection = {
        brands: 'Marcas',
        social: 'Redes sociales',
        managers: 'Usuarios',
        sponsors: 'Sponsors',
        tags: 'Etiquetas',
        footers: 'Footers',
        tagCategories: 'Categorías de etiqueta'
    }

    return titlesByCollection[collection]

}
