'use client'

import { logoutManager } from "@/lib/fetch/get/auth"
import FormSubmit from "@/lib/forms/feedback/FormSubmit"
import { formInitialState } from "@/lib/forms/feedback/state"
import { useEffect } from "react"
import { useFormState } from "react-dom"

export default function LogoutForm({ onSuccess } : { onSuccess: () => void }) {

    const boundAction = logoutManager

    const [ state, action ] = useFormState(boundAction, formInitialState)

    useEffect(() => {

        if (!state.success) return

        onSuccess();

    }, [ state, onSuccess ])

    return (
        <form 
            action={ action }
            className="flex flex-col gap-4 w-full max-w-md"
        >
            <FormSubmit value="Cerrar sesión" pendingValue="Cerrando sesión"/>
        </form>
    )
}
