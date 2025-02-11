// src/scopes/contests.js

const getScopes = (models) => {

    const { Contest, Media, Tag } = models

    return {
        list: {
            order: [["createdAt", "DESC"]],
            include: [ Media, Tag ],
            attributes: ["id", "name", "email", "RoleId"]
        },
        detailed: {
            order: [["createdAt", "DESC"]],
            include: [ Media, Contest, Tag ]
        },
        public: {
            order: [["createdAt", "DESC"]],
            include: [ Media, Contest, Tag ],
            attributes: { exclude: ["contactName, phone, email"] }
        },

    };
  };
  
  module.exports = { getScopes };
  