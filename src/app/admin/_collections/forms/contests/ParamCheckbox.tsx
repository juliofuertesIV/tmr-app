'use client'

import { IContest, IParam } from '@/interfaces'
import Image from 'next/image'
import { ChangeEvent } from 'react'

type Props = {
    param: IParam,
    contest: IContest,
    loading: boolean,
    submitForm: ({ ParamId, method } : { ParamId: string, method: 'POST' | 'DELETE' }) => void
}

export default function ParamCheckbox({ param, contest, loading, submitForm } : Props) {

    const { id, name, description } = param

    const contestHasParam = contest.Params.find(one => one.id === param.id) !== undefined

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        submitForm({ ParamId: param.id, method: contestHasParam ? 'DELETE' : 'POST' })
    }

    if (contestHasParam) return (
        <div 
            data-included={ true }
            className="bg-green-800 rounded-md p-2 hover:bg-red-800 transition-colors group relative"
        >
            <label className="flex flex-col gap-2 cursor-pointer leading-none">
                <div className="flex gap-2 items-center leading-none">
                    <input type="checkbox" name={ 'ParamId' } value={ id } defaultChecked={ contestHasParam } onChange={ onChange }/>
                    <p className='uppercase'>{ name }</p>
                    <small 
                        data-loading={ loading }
                        className='opacity-0 group-hover:opacity-100 data-[loading="true"]:opacity-90 ml-auto'>
                            ELIMINAR PARÁMETRO
                    </small>
                </div>
                <input type="hidden" name='method' value={ 'DELETE' } />
                <small className='opacity-70'>{ description }</small>
                {
                    loading &&
                    <Image
                        className='animate-spin w-4 aspect-square absolute right-1 bottom-1'
                        src={ '/img/spinner.png' }
                        alt='Spinner'
                        width={ 58 }
                        height={ 59 }
                    />
                    
                }
            </label>
        </div>
    )
    
    return (
        <div 
            data-included={ false }
            className="bg-neutral-800 rounded-md p-2 hover:bg-green-800 group relative"
        >
            <label className="flex flex-col gap-2 cursor-pointer leading-none">
                <div className="flex gap-2 items-center leading-none">
                    <input type="checkbox" name={ 'ParamId' } value={ id } defaultChecked={ contestHasParam } onChange={ onChange }/>
                    <p className='uppercase'>{ name }</p>
                    <small 
                        data-loading={ loading }
                        className='opacity-0 group-hover:opacity-100 data-[loading="true"]:opacity-90 ml-auto'>
                            AÑADIR PARÁMETRO
                    </small>
                </div>
                <input type="hidden" name='method' value={ 'POST' }/>
                <small className='opacity-70'>{ description }</small>
                {
                    loading &&
                    <Image
                        className='animate-spin w-4 aspect-square absolute right-1 bottom-1'
                        src={ '/img/spinner.png' }
                        alt='Spinner'
                        width={ 58 }
                        height={ 59 }
                    />
                    
                }
            </label>
        </div>
    )
}
