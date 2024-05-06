'use client'

import { IBrand, IContest, IContestState, IParam } from "@/interfaces"
import { createContext, useState } from "react"

export type IAdminData = {
    contests: IContest[],
    brands: IBrand[],
    params: IParam[],
    states: IContestState[]
}

export const AdminDataContext = createContext<IAdminData>({ contests: [], brands: [], params: [], states: [] })

export default function AdminDataProvider({ children, data } : { children: React.ReactNode, data: IAdminData }) {
    
    const [ adminData, setAdminData ] = useState<IAdminData>(data)
    
    const { contests, brands, params, states } = adminData

    return (
        <AdminDataContext.Provider value={{ contests, brands, params, states }}>
            { children }
        </AdminDataContext.Provider>
    )
}
