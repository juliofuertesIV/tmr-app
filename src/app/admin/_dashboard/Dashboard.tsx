'use client'

import { IAdminData } from '@/lib/types/admin'

export default function Dashboard({ data } : { data: IAdminData }) {

    const { contests, inscriptions, brands } = data 

    return (
        <section className="w-full grid grid-cols-6 gap-4 max-w-6xl mx-auto px-4">
            <header className='pl-4 pb-4 col-span-6'>
                <h1>PANEL GENERAL</h1>
            </header>
            <article className='col-span-2 bg-neutral-800 rounded-md w-full min-h-40'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ÚLTIMOS CONCURSOS</h3>
                </header>
                <div className='w-full flex flex-col gap-2 p-4'>
                    {
                        contests.map((contest, index) => {
                            return (
                                <div   
                                    className='bg-neutral-600 text-neutral-100 px-4 rounded-sm text-center flex justify-between items-center border border-transparent hover:border-neutral-100 cursor-pointer'
                                    key={ `cts_${ index }`}
                                >
                                    <div>{ contest.name } </div>
                                    <div className='text-sm'>{ contest.createdAt.split('T')[0].slice(5).replace('-', '/') } a las { contest.createdAt.split('T')[1].slice(0, 8) }h.</div>
                                </div>
                            )
                        })
                    }
                </div>
            </article>
            <article className='col-span-4 bg-neutral-800 rounded-md w-full min-h-40'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ÚLTIMAS INSCRIPCIONES</h3>
                </header>
                <div className='w-full flex flex-col gap-2 p-4'>
                {    
                        inscriptions.map((inscription, index) => {
                            return (
                                <div   
                                    className='bg-neutral-600 text-neutral-100 px-4 rounded-sm text-center flex justify-between items-center border border-transparent hover:border-neutral-100 cursor-pointer'
                                    key={ `ins_${ index }`}
                                >
                                    <div>{ inscription.name } ({ inscription.Contest.name }) </div>
                                    <div className='text-sm'>{ inscription.createdAt.split('T')[0].slice(5).replace('-', '/') } a las { inscription.createdAt.split('T')[1].slice(0, 8) }h.</div>
                                </div>
                            )
                        })
                    }
                </div>
            </article>
            <article className='col-span-2 bg-neutral-800 rounded-md w-full min-h-40'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ÚLTIMAS MARCAS</h3>
                </header>
                <div className='w-full flex flex-col gap-2 p-4'>
                    {
                        brands.map((brand, index) => {
                            return (
                                <div   
                                    className='bg-neutral-600 text-neutral-100 px-4 rounded-sm text-center flex justify-between items-center border border-transparent hover:border-neutral-100 cursor-pointer'
                                    key={ `brd_${ index }`}
                                >
                                    <div>{ brand.name } </div>
                                    <div className='text-sm'>{ brand.createdAt.split('T')[0].slice(5).replace('-', '/') } a las { brand.createdAt.split('T')[1].slice(0, 8) }h.</div>
                                </div>
                            )
                        })
                    }
                </div>
            </article>
            <article className='col-span-4 bg-neutral-800 rounded-md w-full min-h-40 opacity-20'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ÚLTIMOS VOTANTES</h3>
                </header>
                <div className='bg-neutral-700 w-full flex flex-col gap-2'></div>
            </article>
            <article className='col-span-6 bg-neutral-800 rounded-md w-full min-h-40 opacity-20'>
                <header className='bg-neutral-900 uppercase rounded-t-md py-1 px-4 font-bold'>
                    <h3 className='text-neutral-200'>ESTADÍSTICAS</h3>
                </header>
                <div className='bg-neutral-700 w-full flex flex-col gap-2'></div>
            </article>
        </section>
    ) 
}
