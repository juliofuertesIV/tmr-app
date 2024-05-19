import { IAssociationNames } from "@/types/associations";

const headersByAssociationName = {
    params: {
        title: 'Configuración del concurso',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit?'
    },
    brands: {
        title: 'Marca asociada al concurso',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit?'
    },
    genres: {
        title: 'Géneros incluidos en el concurso',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit?'
    },
    states: {
        title: 'Estado actual del concurso',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit?'
    },
    social: {
        title: 'Redes sociales que utiliza el concurso',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, odit?'
    },
} as {
    [key in IAssociationNames]: {
        title: string,
        description: string
    }
}



export default function AssociationPageHeader({ association } : { association: IAssociationNames }) {
    
    const { title, description } = headersByAssociationName[association]
    
    return (
        <header className="text-center max-w-2xl mb-8">
            <h1 className="mb-4">{ title }</h1>
            <p className="text-justify">{ description }</p>
        </header>
    )
}
