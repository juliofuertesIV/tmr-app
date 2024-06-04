'use client'

import { HTMLProps } from "react"

export function TextInput(props: HTMLProps<HTMLInputElement>) {

    return (
        <input { ...props } />
    )
}
