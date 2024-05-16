import { IContest, IContestState } from "@/interfaces"
import FormSubmit from "../FormSubmit"
import AdminFormFeedback from "../FormFeedback"
import StateRadioButton from "./StateRadioButton"

export default function StateManager({ contest, states } : { contest: IContest, states: IContestState[] }) {
    
/*     const boundAction = updateCollectionItem.bind(null, 'contests', contest.id as string)
    
    const [state, formAction] = useFormState(boundAction, formInitialState)

    const [ contestStatus, setContestStatus ] = useState<{ message?: string, enabled: boolean }>({ message: 'Loading...', enabled: false })
    const [ loadingState, setLoadingState ] = useState<boolean>(true)

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/contests/${ contest.id }/validate`, {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(data => data.json())

            setLoadingState(false)
            setContestStatus({ 
                message: res.success ? res.message : res.error.message,
                enabled: res.success 
            })
        }

        fetchData()

    }, [ contest.id ])
    
    if (!contestStatus.enabled) {
        return (
            <div>
                <p className="bg-red-800 leading-none py-2 px-4 text-center rounded-md">No se puede cambiar el estado: { contestStatus.message } </p>    
            </div>
        )
    } */

    return (
        <form>
            {/* <p className="bg-green-800 leading-none py-2 px-4 mb-4 text-center rounded-md">{ contestStatus.message } </p> */}
            {/* <AdminFormFeedback state={ state }/>  */}
            <fieldset className="border-2 border-neutral-100 px-4 pt-4 pb-4 flex flex-col gap-2 text-sm">
                <legend className="uppercase px-2">Cambiar estado del concurso</legend>
                {
                    states.map((state, index) => 
                        <StateRadioButton 
                            key={ index }
                            state={ state }
                            checked={ contest.StateId === state.id }
                        />
                    )
                }
            </fieldset>
        </form>
    )
}
