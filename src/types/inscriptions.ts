
import { Contest } from "./contests";
import { Media } from "./media";

export type InscriptionScope = 'list' | 'detailed' | 'public' | 'basic'

export type Inscription = {
    id: string,
    name: string,
    year: number,
    image: string,
    city: string,
    description?: string,
    email: string,
    phone: string,
    contactName: string,
    verified: boolean,
    discarded: boolean,
    previousPosition: number,
    instagram?: string,
    video?: string,
    facebook?: string,
    spotify?: string,
    tiktok?: string,
    twitter?: string,
    MediumId: string,
    Medium: Media,
    Contest: Contest,
    ContestId: string, // TO DO: not working
}
