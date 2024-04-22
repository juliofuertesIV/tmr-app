

type ContestStateId = 'inscriptionOnly' | 'open' | 'endedInscription' | 'ended' | 'hidden'
type IContestParamIds = 'inscriptionIsPublic' | 'videoIsRequired' | 'cityIsRequired' | 'instagramIsRequired' | 'hasManyItems' | 'hasGenres'

const states : { id: ContestStateId, name: string, description: string }[] = [
    {
        id: 'inscriptionOnly',
        name: 'Inscripción activada',
        description: 'El concurso está activo y funcionando, los usuarios pueden inscribirse pero no votar.'
    },
    {
        id: 'open',
        name: 'Inscripción y votación',
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
        name: 'Finalizado y oculto',
        description: 'El concurso devuelve una pantalla sin información, informando solamente de que ha finalizado.'
    }
]

const params : { id: IContestParamIds, name: string, description: string }[]  = [
    {
        id: 'inscriptionIsPublic',
        name: 'Inscripción pública',
        description: 'La inscripción es pública y todo el mundo puede inscribirse.'
    },
    {
        id: 'videoIsRequired',
        name: 'Vídeo requerido',
        description: 'Se require adjuntar un vídeo de YouTube para inscribirse.'
    },
    {
        id: 'cityIsRequired',
        name: 'Ciudad de origen',
        description: 'Se require especificar la ciudad de origen para inscribirse.'
    },
    {
        id: 'instagramIsRequired',
        name: 'Perfil de instagram requerido',
        description: 'Se require un perfil de Instagram para inscribirse.'
    },
    {
        id: 'hasManyItems',
        name: 'Número grande de inscripciones',
        description: 'El concurso tiene más de diez o veinte inscripciones, contamos con un gran número de ellas.'
    },
    {
        id: 'hasGenres',
        name: 'Géneros musicales',
        description: 'El concurso incluye diferentes géneros musicales.'
    }
]

const genres = [
    {
        name: 'Pop'
    },
    {
        name: 'Rock'
    },
    {
        name: 'Punk'
    },
    {
        name: 'Urbana'
    },
    {
        name: 'Rap'
    }
]

export { genres, params, states }