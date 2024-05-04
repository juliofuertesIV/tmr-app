'use client'

import { IContest, IParam } from '@/interfaces'
import ParamCheckbox from '../inputs/ParamCheckbox'
import { manageContestParams } from '@/app/_fetch/post'
import { useState } from 'react'

export default function ContestParams({ collectionElement, items } : { collectionElement: IContest, items: IParam[] }) {

    const [ loadingId, setLoadingId ] = useState<string|null>(null)
  
    const submitForm = async ({ ParamId, method } : { ParamId: string, method: 'POST' | 'DELETE' }) => {
        setLoadingId(ParamId)

        await manageContestParams({ method, ParamId, ContestId: collectionElement.id as string })
        .then(data => data)
        .finally(() => setLoadingId(null))
    }

    return (
        <form className=" flex flex-col gap-2">
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
            <legend className="uppercase px-2">Cambiar parámetros del concurso</legend>
                {
                    items.map(param => 
                        <ParamCheckbox 
                            key={ param.id }
                            loading={ loadingId === param.id }
                            contest={ collectionElement }
                            param={ param }
                            submitForm={ submitForm }
                        />
                    )
                }
            </fieldset>
        </form>
    )
}
