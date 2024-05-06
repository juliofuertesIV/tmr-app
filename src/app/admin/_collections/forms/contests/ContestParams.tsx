'use client'

import { IContest, IParam } from '@/interfaces'
import { manageContestParams } from '@/app/_fetch/post'
import { useContext, useState } from 'react'
import ParamCheckbox from './ParamCheckbox'
import { AdminContext } from '@/_providers/AdminProvider'

export default function ContestParams({ item: contest } : { item: IContest }) {

    const { params } = useContext(AdminContext)

    const [ loadingId, setLoadingId ] = useState<string|null>(null)
  
    const submitForm = async ({ ParamId, method } : { ParamId: string, method: 'POST' | 'DELETE' }) => {
        setLoadingId(ParamId)

        await manageContestParams({ method, ParamId, ContestId: contest.id as string })
        .then(data => data)
        .finally(() => setLoadingId(null))
    }

    return (
        <form className=" flex flex-col gap-2">
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
            <legend className="uppercase px-2">Cambiar parámetros del concurso</legend>
                {
                    params.map(param => 
                        <ParamCheckbox
                            key={ param.id }
                            loading={ loadingId === param.id }
                            contest={ contest }
                            param={ param }
                            submitForm={ submitForm }
                        />
                    )
                }
            </fieldset>
        </form>
    )
}
