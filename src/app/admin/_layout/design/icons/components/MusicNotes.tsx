import React from 'react';
import type { SVGProps } from 'react';

export function MusicNotes(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M9 18V5l12-2v13M9 9l12-2"></path><circle cx={6} cy={18} r={3}></circle><circle cx={18} cy={16} r={3}></circle></g></svg>);
}