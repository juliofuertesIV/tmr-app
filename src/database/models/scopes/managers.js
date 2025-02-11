// src/scopes/contests.js

const getScopes = (models) => {

    const { Contest, Media, Role } = models

    console.log({ Contest, Media, Role })
    
    return {
        list: {
            order: [["name", "DESC"]],
            include: [ Media, Role ],
            attributes: ["id", "name", "email", "RoleId"]
        },
        detailed: {
            attributes: ["id", "name", "email", "RoleId"],
            include: [ Media, Contest, Role ]
        }
    };
  };
  
  module.exports = { getScopes };
  