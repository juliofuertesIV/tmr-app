'use client'

import { HTMLProps } from "react"

export function InputWithProps(props: HTMLProps<HTMLInputElement>) {

    return (
        <input { ...props } />
    )
}
