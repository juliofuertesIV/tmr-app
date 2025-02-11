// src/scopes/contests.js

const getScopes = (models) => {

    const { Contest, Media, Role } = models

    return {
        list: {
            order: [["name", "DESC"]],
            include: [ Media, Role ],
            attributes: ["id", "name", "email", "RoleId"]
        },
        detailed: {
            attributes: ["id", "name", "email", "RoleId"],
            include: [ 
                Media, 
                { model: Contest.scope('basic') }, 
                Role 
            ]
        }
    };
  };
  
  module.exports = { getScopes };
  