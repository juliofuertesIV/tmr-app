import { IOneOfCollectionNames, IOneOfCollections } from '@/types'
import ContestGridItem from './ContestGridItem'
import BrandGridItem from './BrandGridItem'


const gridItemByCollectionName : { 
    [key in IOneOfCollectionNames]: 
    ({ item } : { item: IOneOfCollections }) => JSX.Element 
} = {
    contests: ContestGridItem,
    brands: BrandGridItem
} 


export default function CollectionGrid({ items, collection } : { items: IOneOfCollections[], collection: IOneOfCollectionNames }) {

    const GridItem = gridItemByCollectionName[collection]

    return (
        <div className="flex flex-wrap gap-2 justify-start w-full">
        {
            items.map(
                (item: IOneOfCollections, index: number) => 
                    <GridItem key={ index } item={ item }/>
            )
        }
        </div>
    )
}
