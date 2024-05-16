import { IContest, IGenre } from '@/interfaces'

export default function GenreManager({ contest, genres } : { contest: IContest, genres: IGenre[] }) {

    /*   
    const submitForm = async ({ ParamId, method } : { ParamId: string, method: 'POST' | 'DELETE' }) => {
        setLoadingId(ParamId)

        await manageContestParams({ method, ParamId, ContestId: contest.id as string })
        .then(data => data)
        .finally(() => setLoadingId(null))
    } */

    return (
        <form className=" flex flex-col gap-2">
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
            <legend className="uppercase px-2">Cambiar parámetros del concurso</legend>
                {
                    genres.map(genre => {
                        return (
                            <label key={ genre.id }>
                                <p>{ genre.name }</p>
                                <input type='checkbox'></input>
                            </label>
                        )
                    })
                }
            </fieldset>
        </form>
    )
}
