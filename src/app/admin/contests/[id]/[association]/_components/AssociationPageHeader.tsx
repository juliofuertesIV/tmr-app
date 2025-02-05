import { IContest } from "@/types";
import {  IContestAssociationNames } from "@/types/associations";

const headersByAssociationName = {
    params: {
        title: 'Configuración del concurso',
        description: 'La configuración es una serie de parámetros que definen el tipo de concurso. Parámetros como el ranking público o el número de inscripciones repercuten en el diseño del front, y parámetros como la inscripción pública o los requerimientos de vídeo o ciudad afectan al proceso de inscripción.'
    },
    genres: {
        title: 'Géneros del concurso',
        description: 'Si el concurso incluye géneros musicales, puedes marcar aquí qué géneros quieres que puedan utilizarse en el proceso de inscripción.'
    },
    social: {
        title: 'Redes sociales del concurso',
        description: 'Las redes sociales a las que está vinculado un concurso son pasos necesarios en el proceso de votación. Se requerira al usuario seguir a la cuenta asociada a la marca en las redes que estén marcadas.'
    },
    sponsors: {
        title: 'Sponsors del concurso',
        description: 'Cada sponsor va asociado a una imagen que se mostrará en el footer del concurso.'
    }
}

export default function AssociationPageHeader({ association, contest } : { association: IContestAssociationNames, contest: IContest }) {
    
    const { title, description } = headersByAssociationName[association]
    
    return (
        <header className="text-center max-w-2xl mb-8">
            <h1 className="mb-4 uppercase"><b>{ title }</b>: { contest.name }</h1>
            <p className="text-justify">{ description }</p>
        </header>
    )
}
