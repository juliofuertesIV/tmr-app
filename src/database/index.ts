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

export const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'https://www.google.com'
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
    profile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'https://instagram.com'
    }
})

export const Contest = sequelize.define('Contest', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Sin nombre'
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
        type: DataTypes.STRING
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
    }
    }, {
    timestamps: false,
    indexes: [
        { 
            fields: ['domain', 'year'],
            unique: true 
        }
    ]
});

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
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
        indexes: [
            { 
                fields: ['email', 'ContestId'], 
                unique: true 
            }
        ]
}); 

export const Inscription = sequelize.define('Inscription', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'castellano'
    },
    city: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    instagram: {
        type: DataTypes.STRING,
    },
    video: {
        type: DataTypes.STRING
    },
    facebook: {
        type: DataTypes.STRING
    },
    spotify: {
        type: DataTypes.STRING
    },
    tiktok: {
        type: DataTypes.STRING
    },
    twitter: {
        type: DataTypes.STRING
    },
    contactEmail: {
        type:DataTypes.STRING,
        allowNull: false
    },
    contactPhone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contactName: {
        type: DataTypes.STRING,
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
    }, {
        indexes: [
            { 
                fields: ['instagram', 'video', 'ContestId', 'year'],
                unique: true 
            }
        ]
});

export const Vote = sequelize.define('Vote', {
    ContestantId: {
        type: DataTypes.INTEGER,
        references: { model: Inscription },
        primaryKey: true
    },
    VoterId: {
        type: DataTypes.INTEGER,
        references: { model: Voter },
        primaryKey: true
    }
    }, {
        indexes: [
            { fields: ['ContestantId', 'VoterId'], unique: true }
        ]
}); 

Inscription.belongsTo(Contest)
Contest.hasMany(Inscription)

Contest.hasMany(Param)
Param.belongsToMany(Contest, { through: 'ContestParams' })

Contest.belongsTo(State)
State.hasMany(Contest)

Contest.hasMany(Genre)
Param.belongsToMany(Contest, { through: 'ContestGenres' })

Voter.belongsTo(Contest)
Contest.hasMany(Voter)

Contest.belongsTo(Brand)
Brand.hasMany(Contest)

Vote.belongsTo(Inscription)
Inscription.hasMany(Vote)

Vote.belongsTo(Voter)
Voter.hasMany(Vote)

export { sequelize }