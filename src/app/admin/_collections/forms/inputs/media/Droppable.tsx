import { IContestMedia } from "@/interfaces"
import { DragEvent, MouseEvent, useState } from "react"

type Props = {
    onSetFile: (file: File | null) => void,
    onClickDroppable: () => void,
    currentFile: File | IContestMedia | null
}

export default function Droppable({ currentFile, onSetFile, onClickDroppable } : Props) {

    const [ highlight, setHighlight ] = useState<boolean>(false)

    const onDrop = (event: DragEvent) => {
        event.preventDefault()
        onSetFile(event.dataTransfer.files[0] || null)
    }
    const onDragExit = (event: DragEvent) => {
        event.preventDefault()
        setHighlight(false)
    }
    const onDragEnter = (event: DragEvent) => {
        event.preventDefault()
        setHighlight(true)
    }
    const onDragLeave = (event: DragEvent) => {
        event.preventDefault()
        setHighlight(false)
    }
    const onMouseEnter = (event: MouseEvent) => {
        event.preventDefault()
        setHighlight(true)
    }
    const onMouseLeave = (event: MouseEvent) => {
        event.preventDefault()
        setHighlight(false)
    }

    if (!!currentFile) return null

    return (
        <div 
            className='flex w-full min-h-48 h-full rounded-md border-2 border-dashed border-neutral-600 relative hover:border-neutral-400 data-[highlight="true"]:border-neutral-400 transition-colors' 
            onClick={ onClickDroppable }
            onDragLeave={ onDragLeave }
            onDragExit={ onDragExit }
            onDragEnter={ onDragEnter }
            onMouseEnter={ onMouseEnter }
            onMouseLeave={ onMouseLeave }
            onDrop={ onDrop }
            data-highlight={ highlight }
        >
            <div className='absolute inset-0 w-full h-full grid place-items-center bg-neutral-700'>
                <p className='uppercase text-center w-fit text-neutral-400'>Drop your image here</p>
            </div>
        </div>
    )
}
