import { CollectionNames, AllCollections } from "@/types"
import { getTableByCollectionName } from "."
import CollectionTableRow from "./CollectionTableRow"

export default function CollectionTable({ collection, items } : { collection: CollectionNames, items: AllCollections[] }) {

    const table = getTableByCollectionName(collection)

    const { headers, fields, associations } = table

    return (
        <table className="table bg-neutral-900 border-neutral-600">
            <thead className="table-header-group border border-neutral-600 text-center bg-neutral-950 text-sm">
                <tr className="table-row">
                {
                    headers.map((header,  index) => 
                        <th
                            className="border border-neutral-600 uppercase font-semibold py-1 text-neutral-200 cursor-default"
                            key={ index }
                        >
                            { header }
                        </th>
                    )
                }
                    <th className="border-0"></th>
                </tr>
            </thead>
            <tbody className="border border-neutral-600">
                {
                    items?.map((item, index) => 
                        <CollectionTableRow 
                            key={ index }
                            collection={ collection }
                            item={ item }
                            fields={ fields }
                            associations={ associations }
                        /> 
                    )
                }
            </tbody>
        </table>
    )
}
