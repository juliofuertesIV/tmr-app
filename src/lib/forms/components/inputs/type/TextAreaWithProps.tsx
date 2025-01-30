'use client'

import { HTMLProps } from "react"

export function TextAreaWithProps(props: HTMLProps<HTMLTextAreaElement>) {

    return (
        <textarea { ...props } />
    )
}
