
import { IContest, IOneOfCollections, IParam } from '@/interfaces'
import { manageContestParams } from '@/app/_fetch/post'
import { useContext, useState } from 'react'
import ParamCheckbox from './ParamCheckbox'
import { AdminDataContext } from '@/_providers/AdminDataProvider'

export default function ContestParams({ item: contest, params } : { item: unknown, params: unknown }) {

    //const { params } = useContext(AdminDataContext)

  
    const submitForm = async ({ ParamId, method } : { ParamId: string, method: 'POST' | 'DELETE' }) => {

        await manageContestParams({ method, ParamId, ContestId: (contest as IContest).id as string })
        .then(data => data)
        
    }

    return (
        <form className=" flex flex-col gap-2">
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
            <legend className="uppercase px-2">Cambiar parámetros del concurso</legend>
                {
                    (params as IParam[]).map(param => 
                        <ParamCheckbox
                            key={ param.id }
                            loading={ false }
                            contest={ (contest as IContest) }
                            param={ param }
                            submitForm={ submitForm }
                        />
                    )
                }
            </fieldset>
        </form>
    )
}
