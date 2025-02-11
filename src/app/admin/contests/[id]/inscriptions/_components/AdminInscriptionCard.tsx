import { Inscription } from '@/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function AdminInscriptionCard({ inscription } : { inscription: Inscription }) {

    const { 
        id, 
        name, 
        ContestId, 
        genre, 
        city, 
        description, 
        Medium,
        phone,
        contactName,
        email
    } = inscription

    return (
        <article
            className="flex flex-col justify-between w-full p-2 pb-4 px-4 border-2 bg-neutral-800"
        >
            <header>
                <div className="flex w-full rounded-md border-2 border-neutral-950 bg-neutral-900 aspect-video h-fit">
                    <Image
                        className="flex w-full object-cover"
                        src={ Medium.src }
                        width={ parseInt(Medium.width) }
                        height={ parseInt(Medium.height) }
                        alt={ Medium.alt }
                    />
                </div>
            </header>
            <section className="flex flex-col justify-center">
                <header className='flex flex-col gap-1 mt-4'>
                    <Link href={ `/admin/contests/${ ContestId }/inscriptions/${ id }` }>
                        <p className="leading-none font-bold text-xl">{ name }</p>
                    </Link>
                    <p className='leading-none'>{ city }</p>
                </header>
                <div className='mt-2'>Redes · Redes · Redes</div>
                <div className='text-sm text-neutral-300 mt-2'>
                    <p>{ description }</p>
                </div>
            </section>
            <section className='flex flex-col gap-1 mt-4'>
                <p className='leading-none'>{ contactName }</p>
                <p className='leading-none'>{ email }</p>
                <p className='leading-none'>{ phone }</p>
            </section>
            <section className='flex justify-between gap-2 mt-4'>
                <button className='py-1 text-sm w-full rounded-lg font-bold border border-transparent text-neutral-900 bg-green-700'>Verificar</button>
                <button className='py-1 text-sm w-full rounded-lg font-bold border border-transparent text-neutral-900 bg-red-800'>Eliminar</button>
                <button className='py-1 text-sm w-full rounded-lg font-bold border border-neutral-400 text-neutral-400'>Descalificar</button>
            </section>
        </article>
    );
}
