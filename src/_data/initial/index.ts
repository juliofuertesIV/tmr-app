
const brands = [
    {
        name: 'Viña Rock',
        website: 'https://viñarock.com',
        backgroundColor: '#091312',
        foregroundColor: '#e9e9e9',
        accentColor: '#ED1D27',
        profile: 'https://instagram.com/vinarock'
    },
    {
        name: 'FIB',
        website: 'https://fiberfib.com',
        backgroundColor: '#213f83',
        foregroundColor: '#ffffff',
        accentColor: '#ffd539',
        profile: 'https://instagram.com/fiberfib'
    },
    {
        name: 'FIB DJs',
        website: 'https://fiberfib.com',
        backgroundColor: '#213f83',
        foregroundColor: '#ffffff',
        accentColor: '#ffd539',
        profile: 'https://instagram.com/fiberfib'
    },    
    {
        name: 'Arenal Sound',
        website: 'https://arenalsound.com',
        backgroundColor: '#dcfdff',
        foregroundColor: '#000000',
        accentColor: '#E255EC',
        profile: 'https://instagram.com/arenalsound'
    },
    {
        name: 'Arenal Sound DJs',
        website: 'https://arenalsound.com',
        backgroundColor: '#dcfdff',
        foregroundColor: '#000000',
        accentColor: '#E255EC',
        profile: 'https://instagram.com/arenalsound'
    },    
    {
        name: 'Madrid Salvaje',
        website: 'https://madridsalvaje.com',
        backgroundColor: '#0020f8',
        foregroundColor: '#ffffff',
        accentColor: '#EEFD1C',
        profile: 'https://instagram.com/madridsalvaje'
    },
    {
        name: 'Premios Ídolo',
        website: 'https://premiosidolo.com',
        backgroundColor: '#800000',
        foregroundColor: '#ffffff',
        accentColor: '#FEDBBE',
        profile: 'https://instagram.com/premiosidolo'
    }    
]

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

const params = [
    {
        id: 'inscriptionIsPublic',
        name: 'Inscripción pública',
        description: 'La inscripción es pública y todo el mundo puede inscribirse.'
    },
    {
        id: 'videoIsRequired',
        name: 'Requiere vídeo',
        description: 'Se require adjuntar un vídeo de YouTube para inscribirse.'
    },
    {
        id: 'cityIsRequired',
        name: 'Requiere ciudad de origen',
        description: 'Se require especificar la ciudad de origen para inscribirse.'
    },
    {
        id: 'instagramIsRequired',
        name: 'Requiere perfil de instagram',
        description: 'Se require un perfil de Instagram para inscribirse.'
    },
    {
        id: 'hasManyItems',
        name: 'Número grande de inscripciones',
        description: 'El concurso tiene más de diez o veinte inscripciones, contamos con un gran número de ellas.'
    },
    {
        id: 'hasGenres',
        name: 'Especifica géneros musicales',
        description: 'El concurso incluye diferentes géneros musicales, se elige uno al inscribirse.'
    },
    {
        id: 'hasRanking',
        name: 'Muestra ranking público',
        description: 'El ranking se muestra públicamente en una página específica y en la cabecera de las cards.'
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

export { genres, params, states, brands }