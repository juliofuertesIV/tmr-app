
type GetContestById = (
    id: string,
) => Promise<{ 
    contest: any
}>

type GetContests = () => Promise<{
    data: any[],
    message: string,
    success: boolean,
    error: any | null
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
    .catch(error => error)

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
    .catch(error => error)

    return res
}


