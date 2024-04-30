import { IContestMediaType } from "@/interfaces"

type Props = {
    label: string,
    type: IContestMediaType,

}

export default function FileInput({ label, type } : Props) {
    return (
        <label>
            <p>{ label }</p>
            <input type="file" name={ type }/>
        </label>
    )
}
