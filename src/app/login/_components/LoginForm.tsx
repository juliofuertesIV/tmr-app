'use client'

import { login } from "@/app/_fetch/post"
import { formInitialState } from "@/types/forms"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import AdminFormFeedback from "@/app/admin/_collections/forms/FormFeedback"
import FormSubmit from "@/app/admin/_collections/forms/FormSubmit"
import { useRouter } from "next/navigation"
import { IManager } from "@/types"

export default function LoginForm({ manager } : { manager: IManager | null }) {

    const [ state, formAction ] = useFormState(login, formInitialState)

    const router = useRouter()

    useEffect(() => {

        const navigateToAdminPage = () => {
            setTimeout(() => {
                router.push('/admin')
            }, 500)
        }

        if (!!manager) {
            navigateToAdminPage()
        } 
        
    }, [ router, manager ])

    return (
        <form 
            action={ formAction }
            className="flex flex-col gap-4 w-full max-w-md bg-neutral-900 p-4 rounded-md"
        >
            <AdminFormFeedback state={ state }/>
            <label className="flex gap-2 items-center">
                <p className="text-sm">Email:</p>
                <input
                    className="flex-1 pl-2 py-1 rounded-sm flex items-center text-neutral-800" 
                    type="email" 
                    name="email"
                    autoComplete="on"
                />
            </label>
            <label className="flex gap-2 items-center">
                <p className="text-sm">Contraseña:</p>
                <input
                    className="flex-1 pl-2 py-1 rounded-sm flex items-center text-neutral-800" 
                    type="password" 
                    name="password"
                    autoComplete="off"
                />
            </label>
            <FormSubmit value="Iniciar sesión"/>
        </form>
    )
}
