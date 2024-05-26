import { Log } from '@/database'
import { ILog } from '@/types'
import React from 'react'

const getLogs = async () : Promise<ILog[]> => {
    const logs = await Log.findAll({ 
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then(data => data)
    .catch(error => {
        throw new Error('Unable to get database logs: ' + error)
    }) as unknown as ILog[]

    return logs
}

export default async function LogPage() {

    const logs = await getLogs()

    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-neutral-950">
            <section className="flex flex-col gap-2 w-full max-w-4xl">
                <header className="py-8">
                    <h1 className="capitalize">Logs</h1>
                </header>
                <table className='table'>
                    <thead className='table-header-group'>
                        <tr className='table-row'>
                            <th className='table-cell border border-neutral-700 px-4'>Tipo</th>
                            <th className='table-cell border border-neutral-700 px-4'>Mensaje</th>
                            <th className='table-cell border border-neutral-700 px-4'>Ruta</th>
                            <th className='table-cell border border-neutral-700 px-4'>Causa</th>
                            <th className='table-cell border border-neutral-700 px-4'>Colección</th>
                            <th className='table-cell border border-neutral-700 px-4'>Fecha</th>
                        </tr>
                    </thead>
                    <tbody className='table-row-group'>
                        {
                            logs.map((log, index) => {
                                return (
                                    <tr className='table-row text-sm' key={ index }>
                                        <td className='table-cell border border-neutral-700 px-4 text-center'>{ log.type }</td>
                                        <td className='table-cell border border-neutral-700 px-4 text-center'>{ log.message }</td>
                                        <td className='table-cell border border-neutral-700 px-4 text-center'>{ log.route }</td>
                                        <td className='table-cell border border-neutral-700 px-4 text-center'>{ log.errorCause || "N/A" }</td>
                                        <td className='table-cell border border-neutral-700 px-4 text-center'>{ log.collection || "N/A" }</td>
                                        <td className='table-cell border border-neutral-700 px-4 text-center'>{ `${log.createdAt.toLocaleDateString()} ${log.createdAt.toLocaleTimeString()}` }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}
