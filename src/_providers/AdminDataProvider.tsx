'use client'

import { IBrand, IContest, IContestState, IGenre, IParam } from "@/interfaces"
import { createContext, useState } from "react"

export type IAdminData = {
    contests: IContest[],
    brands: IBrand[],
    params: IParam[],
    states: IContestState[],
    genres: IGenre[]
}

export const AdminDataContext = createContext<IAdminData>({ contests: [], brands: [], params: [], states: [], genres: [] })

export default function AdminDataProvider({ children, data } : { children: React.ReactNode, data: IAdminData }) {
    
    const [ adminData, setAdminData ] = useState<IAdminData>(data)
    
    const { contests, brands, params, states, genres } = adminData

    return (
        <AdminDataContext.Provider value={{ contests, brands, params, states, genres }}>
            { children }
        </AdminDataContext.Provider>
    )
}
