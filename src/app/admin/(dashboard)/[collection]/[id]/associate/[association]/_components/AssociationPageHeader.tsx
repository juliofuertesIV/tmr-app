
const headersByAssociationName = {
    params: {
        title: 'Configuración',
        description: 'La configuración es una serie de parámetros que definen el tipo de concurso. Parámetros como el ranking público o el número de inscripciones repercuten en el diseño del front, y parámetros como la inscripción pública o los requerimientos de vídeo o ciudad afectan al proceso de inscripción.'
    },
    brand: {
        title: 'Marca',
        description: 'Los concursos deben pertenecer a una marca. El branding define los colores que se van a emplear en el front, pero tambien la página oficial del festival al que pertenece y sus perfiles en redes sociales.'
    },
    state: {
        title: 'Estado',
        description: 'El estado actual del concurso afecta al proceso de inscripción y de votación. Hasta que un concurso no está completamente configurado no puede cambiar su estado y permanecerá oculto.'
    },
    social: {
        title: 'Redes sociales',
        description: 'Las redes sociales a las que está vinculado un concurso son pasos necesarios en el proceso de votación. Se requerira al usuario seguir a la cuenta asociada a la marca en las redes que estén marcadas.'
    },
    media: {
        title: 'Imágenes',
        description: 'Las imágenes asociadas a esta colección de elementos.'
    },
    role: {
        title: 'Roles',
        description: 'El rol del usuario determina sus permisos dentro del panel de administración.'
    },
    sponsors: {
        title: 'Sponsors',
        description: 'Cada sponsor va asociado a una imagen que se mostrará en el footer del concurso.'
    }
}



export default function AssociationPageHeader({ collection, association, item } : { collection: ICollectionsWithAssociationsNames, association: IAssociationNames | IContestRelationshipNames, item: ICollectionsWithAssociations }) {
    
    const { title, description } = headersByAssociationName[association]
    
    return (
        <header className="text-center max-w-2xl mb-8">
            <p className="text-justify">{ description }</p>
        </header>
    )
}
