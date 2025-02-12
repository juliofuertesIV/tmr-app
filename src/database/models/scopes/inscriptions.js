// src/scopes/contests.js

const getScopes = (models) => {

    const { Contest, Media, Tag } = models

    return {
        list: {
            order: [["createdAt", "DESC"]],
            include: [ Media, Tag ],
            attributes: ["id", "name", "email", "ContestId"]
        },
        detailed: {
            order: [["createdAt", "DESC"]],
            include: [ Media, Tag ]
        },
        public: {
            order: [["createdAt", "DESC"]],
            include: [ Media, Tag ],
            attributes: { exclude: ["contactName, phone, email"] }
        },
        basic: {
            attributes: ["id", "verified"]
        }
    };
  };
  
  module.exports = { getScopes };
  