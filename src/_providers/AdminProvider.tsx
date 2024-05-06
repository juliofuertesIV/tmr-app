'use client'

import { IBrand, IContest, IContestMedia, IContestState, IParam } from "@/interfaces"
import { createContext, useState } from "react"

type IAdminData = {
    contests: IContest[],
    brands: IBrand[],
    params: IParam[],
    states: IContestState[]
}
export const AdminContext = createContext<IAdminData>({ contests: [], brands: [], params: [], states: [] })

export default function AdminProvider({ children, data } : { children: React.ReactNode, data: IAdminData }) {


    const [ adminData, setAdminData ] = useState<IAdminData>(data)

    return (
        <AdminContext.Provider value={{ ...adminData }}>
            { children }
        </AdminContext.Provider>
    )
}
