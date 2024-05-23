'use client'

import { useEffect } from "react"
import FormSubmit from "@/app/admin/_collections/forms/FormSubmit"
import { useRouter } from "next/navigation"
import { IManager } from "@/types"

export default function LogoutForm({ manager, formAction } : { manager?: IManager | null, formAction: (payload: FormData) => void }) {

    const router = useRouter()

    useEffect(() => {

        const navigateToLoginPage = () => {
            setTimeout(() => {
                router.push('/login')
            }, 500)
        }

        if (!manager) {
            navigateToLoginPage()
        } 
        
    }, [ router, manager ])

    return (
        <form 
            action={ formAction }
            className="flex flex-col gap-4 w-full max-w-md bg-neutral-900 p-4 rounded-md"
        >
            <FormSubmit value="Cerrar sesión"/>
        </form>
    )
}
