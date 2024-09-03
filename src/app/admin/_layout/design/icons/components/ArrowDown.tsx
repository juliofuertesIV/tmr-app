import React, { SVGProps } from 'react'

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props }>
            <path d="M7 12.5L14 19.5L21 12.5" stroke='currentColor' stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}
