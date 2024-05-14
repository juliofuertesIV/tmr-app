
import { IContest, IParam } from '@/interfaces'

export default function ContestParams({ contest, params } : { contest: IContest, params: IParam[] }) {

    if (!params) {
        return null
    }
  
    return (
        <form className=" flex flex-col gap-2">
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
            <legend className="uppercase px-2">Cambiar parámetros del concurso</legend>
                {
                    params.map(param =>
                        <div
                            key={ param.id }
                        >
                            { param.name }
                        </div> 
                    )
                }
            </fieldset>
        </form>
    )
}
