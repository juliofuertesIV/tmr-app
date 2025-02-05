import { IContest } from ".";
import { IMedia } from "./media";

export type IInscription = {
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
    genre?: string,
    instagram?: string,
    video?: string,
    facebook?: string,
    spotify?: string,
    tiktok?: string,
    twitter?: string,
    MediumId: string,
    Medium: IMedia,
    Contest: IContest,
}
