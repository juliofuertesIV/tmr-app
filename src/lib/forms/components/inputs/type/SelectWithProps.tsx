'use client'

import { HTMLProps } from "react"

export function SelectWithProps(props: HTMLProps<HTMLSelectElement>) {

    return (
        <select { ...props } />
    )
}
