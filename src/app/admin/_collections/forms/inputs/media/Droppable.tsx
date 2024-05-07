import { DragEvent, MouseEvent, useState } from "react"

type Props = {
    onSetFile: (event: DragEvent) => void,
    onClickDroppable: () => void
}

export default function Droppable({ onSetFile, onClickDroppable } : Props) {

    const [ highlight, setHighlight ] = useState<boolean>(false)

    const onDrop = (event: DragEvent) => {
        event.preventDefault()
        onSetFile(event)
    }
    const onDragOver = (event: DragEvent) => {
        event.preventDefault()
        setHighlight(true)
    }

    const onDragEnter = (e: DragEvent) => setHighlight(true)
    const onDragLeave = (e: DragEvent) => setHighlight(false)
    const onMouseEnter = (e: MouseEvent) => setHighlight(true)
    const onMouseLeave = (e: MouseEvent) => setHighlight(false)

    return (
        <div 
            className='flex w-full min-h-48 h-full rounded-md border-2 border-dashed border-neutral-600 relative hover:border-neutral-400 data-[highlight="true"]:border-neutral-400 transition-colors' 
            data-highlight={ highlight }
            onClick={ onClickDroppable }
            onDragLeave={ onDragLeave }
            onDragOver={ onDragOver }
            onDragEnter={ onDragEnter }
            onMouseEnter={ onMouseEnter }
            onMouseLeave={ onMouseLeave }
            onDrop={ onDrop }
        >
            <p className='absolute uppercase text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-neutral-400 pointer-events-none'>Drop your image here</p>
        </div>
    )
}
