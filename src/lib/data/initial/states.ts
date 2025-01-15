const states = [
    {
        id: 'inscriptionOnly',
        name: 'Inscripción activada',
        description: 'El concurso está activo y funcionando, los usuarios pueden inscribirse pero no votar.',
    },
    {
        id: 'open',
        name: 'Abierto',
        description: 'El concurso está activo y funcionando, los usuarios pueden tanto inscribirse como votar.'
    },
    {
        id: 'endedInscription',
        name: 'Inscripción terminada',
        description: 'El concurso está activo, los usuarios pueden votar pero ya no pueden entrar nuevas inscripciones.'
    },
    {
        id: 'ended',
        name: 'Finalizado',
        description: 'El concurso ha terminado y ya no se puede votar.'
    },
    {
        id: 'hidden',
        name: 'Oculto',
        description: 'El concurso devuelve una pantalla sin información, informando solamente de que no está activo.'
    }
]

export default states