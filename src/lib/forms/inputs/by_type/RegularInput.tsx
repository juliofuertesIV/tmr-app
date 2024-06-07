'use client'

import { HTMLProps } from "react"

export function RegularInput(props: HTMLProps<HTMLInputElement>) {

    return (
        <input { ...props } />
    )
}
