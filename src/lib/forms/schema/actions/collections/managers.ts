import { addManager } from "@/lib/fetch/post/managers"
import { updateManagerProfile } from "@/lib/fetch/put/managers"


export const getUpdateManagerProfileBoundAction = ({ 
    id 
} : { 
    id: string 
}) => updateManagerProfile.bind(null, id)

export const getAddManagerBoundAction = () => addManager.bind(null)
