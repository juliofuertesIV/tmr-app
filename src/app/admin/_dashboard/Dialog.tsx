import { IOneOfCollectionNames } from '@/types'
import { getFormByCollectionName } from '../_collections'
import CreationForm from '../_collections/forms/CreationForm'

type Props = {
    collection: IOneOfCollectionNames | null,
    onManageDialog: (dialogState: { collection: IOneOfCollectionNames | null, isOpen: boolean }) => void
}

export default function Dialog({ collection, onManageDialog }: Props) {

    if (!collection) return null

    const { action, fields } = getFormByCollectionName({ collection, actionTarget: 'creation' })

    return (
        <div className='bg-neutral-950 text-neutral-100 border-2 border-neutral-300 rounded-md w-full max-w-2xl mx-auto'>
            <header className='flex justify-end bg-neutral-700 rounded-t-md py-1 px-1'>
                <button 
                    className='px-2 py-1 bg-neutral-200 text-neutral-800 text-xs m-1'
                    onClick={ () => onManageDialog({ collection: null, isOpen: false}) }
                >
                    CERRAR
                </button>
            </header>
            <div className='p-4'>
                <CreationForm collection={ collection } action={ action } fields={ fields }/>
            </div>
        </div>
    )
}
