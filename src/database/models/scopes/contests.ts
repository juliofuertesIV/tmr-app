import { FindOptions } from "sequelize"
import { Brand, Genre, Inscription, Media, Param, SocialMedia, State } from ".."

const basicScope : FindOptions = {
    order: [['createdAt', 'DESC']],
    include: [ 
        { model: Inscription, attributes: ['id'] },
        Brand,
        State,
        SocialMedia,
        Param,
        Genre
    ]
}

const adminScope = {
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

const publicScope = {
    order: [['createdAt', 'DESC']],
    include: [ 
        { 
          model: Inscription.scope('public') 
        },
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
