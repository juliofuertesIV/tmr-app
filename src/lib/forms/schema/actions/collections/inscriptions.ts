import { addInscription } from "@/lib/fetch/post/collections"
import { updateInscription } from "@/lib/fetch/put/inscriptions"

export const getAddInscriptionBoundAction = () => addInscription.bind(null)

export const getUpdateInscriptionBoundAction = ({ 
    id
 } : { 
    id: string 
}) => updateInscription.bind(null, id)
