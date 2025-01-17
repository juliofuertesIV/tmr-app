import React from 'react';
import type { SVGProps } from 'react';

export function Tag(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="currentColor"><path d="M2 3a1 1 0 0 1 1-1h8a1 1 0 0 1 .707.293l10 10a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-10-10A1 1 0 0 1 2 11zm2 1v6.586l9 9L19.586 13l-9-9z"></path><path d="M9 7.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"></path></g></svg>);
}