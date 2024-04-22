'use server'
    
import { revalidateTag } from "next/cache"

type UpdateContest = (
    id: string,
    formData: FormData
) => Promise<{ 
    message: string,
    affectedRows: number[] 
}>

const getContestPayload = (formData: FormData) => {
    return {
        name: formData.get('name'),
        date: formData.get('date'),
        description: formData.get('description'),
        ticketUrl: formData.get('ticketUrl'),
        isStarred: formData.get('isStarred') == 'on',
        isSoldOut: formData.get('isSoldOut') == 'on',
        isFreeEntry: formData.get('isFreeEntry') == 'on',
        isVisible: formData.get('isVisible') == 'on'
    }
}


export const updateContest : UpdateContest = async (id: string, formData: FormData) => {
    
    const payload = getContestPayload(formData)

    const res = await fetch(`http://localhost:3000/api/contests/${ id }`, {
        method: "PUT",
        cache: 'no-cache',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(async (data) => await data.json())
    .catch(error => {
        console.log({ error })
        throw new Error('Error updating data.')
    })

    revalidateTag('contests')

    return res
}

