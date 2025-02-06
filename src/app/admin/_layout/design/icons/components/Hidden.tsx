import React, { SVGProps } from 'react'

export function HiddenIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props }>
        <path d="M22.2859 9.85718C19.7716 12.6512 16.6287 14.0477 12.8573 14.0477C9.08585 14.0477 5.943 12.6512 3.42871 9.85718M3.42871 16.1429L6.04776 12.1619M22.2859 16.1177L19.6752 12.1619M9.71442 18.2381L10.2382 14.0477M16.0001 18.2381L15.4763 14.0477" stroke="currentColor" strokeWidth="2.16071" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
