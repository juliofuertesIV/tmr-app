// src/scopes/contests.js

const getScopes = (models) => {

    return {
        public: {
            attributes: { exclude: ["folder", "filename", "role"]}
        },
        detailed: {
            order: [["createdAt", "DESC"]]
        }
    };
  };
  
  module.exports = { getScopes };
  