// src/scopes/contests.js

/* const getScopes = (models) => {

    const { Contest, Media, Role } = models

    return {
        list: {
            order: [["name", "DESC"]],
            include: [ Media, Role ],
            attributes: ["id", "name", "email", "RoleId"]
        },
        detailed: {
            attributes: ["id", "name", "email", "RoleId", "MediumId"],
            include: [ 
                Media, 
                { model: Contest.scope('basic') }, 
                Role 
            ]
        }
    };
  };
   */
  
  
const getManagerScopes = (models) => {

    const { Contest, Media, Role } = models

    console.log({ Contest, Media, Role })
    
    return [
        { 
            name: 'list',
            scope: {
                order: [["name", "DESC"]],
                include: [ Media, Role ],
                attributes: ["id", "name", "email", "RoleId"]
            }
        },
        {
            name: 'detailed',
            scope: {
                attributes: ["id", "name", "email", "RoleId", "MediumId"],
                include: [ 
                    Media, 
                    Contest,
                    Role 
                ]
            }
        }
    ]    
}
module.exports = { getManagerScopes };