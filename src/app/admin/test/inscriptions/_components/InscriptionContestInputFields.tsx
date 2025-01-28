import { IContest } from '@/types'
import React from 'react'

export default function InscriptionContestInputFields({ contest } : { contest: IContest }) {
    return (
        <>
            <input type="hidden" name="year" value={ contest.year } />
            <input type="hidden" name="domain" value={ contest.domain } /> 
            <input type="hidden" name="ContestId" value={ contest.id } />
        </>
    )
}
