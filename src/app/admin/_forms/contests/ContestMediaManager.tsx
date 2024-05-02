import { IContest } from "@/interfaces"
import FileUploadForm from "../inputs/FileUploadForm"

export default function ContestMediaManager({ contest } : { contest: IContest }) {
    
    return (
        <div className=" flex flex-col gap-2">
            <h3 className="uppercase pb-2">Add media:</h3>
            <FileUploadForm collectionElement={ contest } mediaType="logo" label="Logo: "/>
        </div>
    )
}
