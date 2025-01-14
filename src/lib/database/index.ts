import { extractedSubdomainString } from "@/lib/forms/validation/functions";
import { DataTypes } from "sequelize";
import { Sequelize } from 'sequelize'

const dbName = process.env.DATABASE_NAME as string
const dbUser = process.env.DATABASE_USER as string
const dbPass = process.env.DATABASE_PASSWORD as string

const mariadb = require('mysql2')

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: mariadb,
    port: 3306
});


export const testDatabaseConnection = async () => await sequelize.authenticate()
    .catch(error => { throw new Error(error) })

export const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    errorCause: {
        type: DataTypes.STRING,
    },
    digest: {
        type: DataTypes.STRING,
    },
    route: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blame: {
        type: DataTypes.STRING
    },
    collection: {
        type: DataTypes.STRING
    }
})

export const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const Manager = sequelize.define('Manager', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RoleId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 1
    }
})


export const State = sequelize.define('State', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

export const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false
    },
    backgroundColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '#e9e9e9'
    },
    foregroundColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '#121212'
    },
    accentColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'crimson'
    },    
    instagramProfile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tiktokProfile: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const Contest = sequelize.define('Contest', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bannerHref: {
        type: DataTypes.STRING,
    },
    metaUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metaTitle: {
        type: DataTypes.STRING
    },
    metaDescription: {
        type: DataTypes.TEXT
    },
    postmarkToken: {
        type: DataTypes.STRING,
    },
    postmarkSenderAddress: {
        type: DataTypes.STRING,
    },
    googleAnalyticsId: {
        type: DataTypes.STRING,
    },
    googleTagManagerId: {
        type: DataTypes.STRING
    },
    metaPixelId: {
        type: DataTypes.STRING
    },
    termsAndConditions: {
        type: DataTypes.TEXT
    },
    StateId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'hidden'
    }
    }, {
    paranoid: true,
    indexes: [
        { 
            fields: ['domain', 'year'],
            unique: true 
        }
    ],
    hooks: {
        beforeValidate: record => {

            if (!record.dataValues.metaUrl) return 
            
            const parsedDomain = extractedSubdomainString(record.dataValues.metaUrl)

            if (parsedDomain === record.dataValues.domain) return
            
            record.dataValues.domain = parsedDomain
        }
    }
});

export const Param = sequelize.define('Param', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

export const SocialMedia = sequelize.define('SocialMedia', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

export const Genre = sequelize.define('Genres', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

export const Voter = sequelize.define('Voter', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailVerified: {
        type:DataTypes.BOOLEAN,
        allowNull: false
    },
    acceptsCommunications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    }, {
        paranoid: true,
        indexes: [
            { 
                fields: ['email', 'ContestId'], 
                unique: true 
            }
        ]
}); 

export const Inscription = sequelize.define('Inscription', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING,
    },
    video: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING,
    },
    spotify: {
        type: DataTypes.STRING
    },
    tiktok: {
        type: DataTypes.STRING
    },
    contactName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    discarded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    previousPosition: {
        type: DataTypes.INTEGER
    },
    internalVoteQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isStarred: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    }, {
        paranoid: true,
        indexes: [
            { 
                fields: ['instagram', 'video', 'ContestId', 'year'],
                unique: true 
            }
        ],
        hooks: {
            beforeCreate: record => {
                record.dataValues.year = new Date().getUTCFullYear()
            }
        }
    }
);

export const Vote = sequelize.define('Vote', {
    ContestantId: {
        type: DataTypes.UUID,
        references: { model: Inscription },
        primaryKey: true
    },
    VoterId: {
        type: DataTypes.UUID,
        references: { model: Voter },
        primaryKey: true
    }
    }, {
        paranoid: true,
        indexes: [
            { fields: ['ContestantId', 'VoterId'], unique: true }
        ]
}); 

export const Media = sequelize.define('Media', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    src: {
        type: DataTypes.STRING,
        allowNull: false
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    alt: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const Sponsor = sequelize.define('Sponsor', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export const ContestParam = sequelize.define('ContestParams', {
}, {
    timestamps: false
})

export const ContestGenre = sequelize.define('ContestGenres', {
}, {
    timestamps: false
})

export const ContestSocial = sequelize.define('ContestSocials', {
}, {
    timestamps: false
})

export const ContestMedia = sequelize.define('ContestMedia', {
}, {
    timestamps: false
})

export const ContestSponsor = sequelize.define('ContestSponsors', {
}, {
    timestamps: false
})

Inscription.belongsTo(Contest)
Contest.hasMany(Inscription)

Contest.belongsToMany(Param, { through: 'ContestParams'})
Param.belongsToMany(Contest, { through: 'ContestParams'})

Contest.belongsToMany(SocialMedia, { through: 'ContestSocials'})
SocialMedia.belongsToMany(Contest, { through: 'ContestSocials'})

Contest.belongsTo(State)
State.hasMany(Contest)

Inscription.belongsTo(Media, { onDelete: 'CASCADE' })
Media.hasOne(Inscription, { onDelete: 'CASCADE' })

Sponsor.belongsTo(Media, { onDelete: 'CASCADE' })
Media.hasOne(Sponsor, { onDelete: 'CASCADE' })

Contest.belongsToMany(Genre, { through: 'ContestGenres' })
Genre.belongsToMany(Contest, { through: 'ContestGenres' })

Contest.belongsToMany(Media, { through: 'ContestMedia' })
Media.belongsToMany(Contest, { through: 'ContestMedia' })

Contest.belongsToMany(Sponsor, { through: 'ContestSponsors' })
Sponsor.belongsToMany(Contest, { through: 'ContestSponsors' })

Manager.belongsTo(Role)
Role.hasMany(Manager)

Contest.belongsToMany(Manager, { through: 'ManagerContests' })
Manager.belongsToMany(Contest, { through: 'ManagerContests' })

Voter.belongsTo(Contest)
Contest.hasMany(Voter)

Contest.belongsTo(Brand)
Brand.hasMany(Contest)

Vote.belongsTo(Inscription)
Inscription.hasMany(Vote)

Vote.belongsTo(Voter)
Voter.hasMany(Vote)

export { sequelize }