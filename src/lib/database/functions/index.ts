'use server'

import { Brand, Contest, Genre, Inscription, Media, Param, SocialMedia, State } from "@/database/models"
import { FindOptions } from "sequelize"

const options : FindOptions = {
    order: [['createdAt', 'DESC']],
    include: [ Inscription, Brand, State, SocialMedia, Param, Genre ]
}

const singleContestOptions : FindOptions = {
    order: [['createdAt', 'DESC']],
    include: [ 
        Inscription,
        Brand,
        State,
        SocialMedia,
        Param,
        Genre, 
        { model: Media, as: 'Logo' },
        { model: Media, as: 'Banner' },
        { model: Media, as: 'Frame' },
        { model: Media, as: 'Favicon' },
    ]
}

export const getAllContestsFromDatabase = async () => {
    await Contest.findAll({ ...options })
}

export const getContestFromDatabase = async ({ id } : { id: string }) => {
    await Contest.findOne({ where: { id }, ...singleContestOptions })
}
