'use server'

import { revalidateTag } from "next/cache"

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

export const addContest = async (formData: FormData) => {

    const payload = getContestPayload(formData)

    const res = await fetch(`http://localhost:3000/api/contests`, {
        method: "POST",
        cache: 'no-cache',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(data => data.json())
    .catch(e => {
        throw new Error('Error añadiendo elemento.')
    })

    revalidateTag('contests')
    return res
}
