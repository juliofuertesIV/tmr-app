'use client'

import FormSubmit from "@/forms/feedback/FormSubmit"
import { IManager } from "@/types"

export default function LogoutForm({ formAction } : { formAction: (payload: FormData) => void }) {

    return (
        <form 
            action={ formAction }
            className="flex flex-col gap-4 w-full max-w-md"
        >
            <FormSubmit value="Cerrar sesión" pendingValue="Cerrando sesión"/>
        </form>
    )
}
