import { Log } from '@/database/models'
import { Log as LogType } from '@/types'
import React from 'react'

const getLogs = async () : Promise<LogType[]> => {
    const logs = await Log.findAll({ 
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then(data => data)
    .catch(error => {
        throw new Error('Unable to get database logs: ' + error)
    }) as unknown as LogType[]

    return logs
}

export default async function LogPage() {

    const logs = await getLogs()

    return (       
        <section className="admin-page-content">
            <header className="py-8">
                <h1 className="capitalize">Logs</h1>
            </header>
            <table className='table font-sans w-full max-w-7xl'>
                <thead className='table-header-group'>
                    <tr className='table-row'>
                        <th className='table-cell border border-neutral-700 px-4'>Tipo</th>
                        <th className='table-cell border border-neutral-700 px-4'>Mensaje</th>
                        <th className='table-cell border border-neutral-700 px-4'>Ruta</th>
                        <th className='table-cell border border-neutral-700 px-4'>Causa</th>
                        <th className='table-cell border border-neutral-700 px-4'>Blame</th>
                        <th className='table-cell border border-neutral-700 px-4'>Colección</th>
                        <th className='table-cell border border-neutral-700 px-4'>Fecha</th>
                    </tr>
                </thead>
                <tbody className='table-row-group'>
                    {
                        logs.map((log, index) => {
                            return (
                                <tr className='table-row odd:bg-neutral-900' key={ index }>
                                    <td className='table-cell border border-neutral-700 px-4 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-32'>{ log.type }</td>
                                    <td className='table-cell border border-neutral-700 px-4 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-32'>{ log.message }</td>
                                    <td className='table-cell border border-neutral-700 px-4 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-32'>{ log.route }</td>
                                    <td className='table-cell border border-neutral-700 px-4 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-32'>{ log.errorCause || "N/A" }</td>
                                    <td className='table-cell border border-neutral-700 px-4 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-32'>{ log.Manager?.name || "N/A" }</td>
                                    <td className='table-cell border border-neutral-700 px-4 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-32'>{ log.collection || "N/A" }</td>
                                    <td className='table-cell border border-neutral-700 px-4 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-32'>{ `${log.createdAt.toLocaleDateString()} ${log.createdAt.toLocaleTimeString()}` }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}
