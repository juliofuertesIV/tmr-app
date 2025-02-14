// src/scopes/contests.js

const getInscriptionScopes = (models) => {

    const { Contest, Media, Tag } = models
    
    return [
        { 
            name: 'list', 
            scope: {
                order: [["createdAt", "DESC"]],
                include: [ Media, Tag ],
                attributes: ["id", "name", "email", "ContestId"]
            },
        },
        { 
            name: 'detailed', 
            scope: {
                order: [["createdAt", "DESC"]],
                include: [ 
                    Media,
                    Tag,
                    { 
                        model: Contest,
                        attributes: ['id', 'name', 'year', 'domain'],
                    }
                ] 
            }
        },
        { 
            name: 'public', 
            scope: {
                order: [["createdAt", "DESC"]],
                include: [ Media, Tag ],
                attributes: { exclude: ["contactName, phone, email"] }
            }
        },
        { 
            name: 'basic', 
                scope: {
                attributes: ["id", "verified"]
            }
        }
    ]
}
  
  module.exports = { getInscriptionScopes };
  