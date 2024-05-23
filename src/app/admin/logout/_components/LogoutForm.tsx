'use client'

import { useEffect } from "react"
import FormSubmit from "@/app/admin/_collections/forms/FormSubmit"
import { useRouter } from "next/navigation"
import { IManager } from "@/types"

export default function LogoutForm({ manager, formAction } : { manager?: IManager | null, formAction: (payload: FormData) => void }) {

    const router = useRouter()

    useEffect(() => {

        const navigateToLoginPage = () => {
            router.push('/login')
        }

        if (!manager) {
            navigateToLoginPage()
        } 
        
    }, [ router, manager ])

    return (
        <form 
            action={ formAction }
            className="flex flex-col gap-4 w-full max-w-md"
        >
            <FormSubmit value="Cerrar sesión" pendingValue="Cerrando sesión"/>
        </form>
    )
}
