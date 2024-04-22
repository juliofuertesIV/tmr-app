
type GetContestById = (
    id: string,
) => Promise<{ 
    contest: any
}>

type GetContests = (
    id: string,
) => Promise<{ 
    contest: any
}>


export const getContestById : GetContestById = async (id: string) => {
    
    const res = await fetch(`http://localhost:3000/api/contests/${ id }`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ['contests']
        }
    })
    .then(async (data) => await data.json())
    .catch(error => {
        console.log({ error })
        throw new Error('Error updating data.')
    })

    return res
}

export const getContests : GetContests = async () => {
    
    const res = await fetch(`http://localhost:3000/api/contests`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ['contests']
        }
    })
    .then(async (data) => await data.json())
    .catch(error => {
        console.log({ error })
        throw new Error('Error updating data.')
    })

    return res
}


