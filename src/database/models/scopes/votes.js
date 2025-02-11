// src/scopes/contests.js

const getScopes = (models) => {

    const { Voter } = models
    
    return {
        public: {
            attributes: ["VoterId", "InscriptionId"],
        },
        detailed: {
            include: [ Voter ],
        }
    };
  };
  
  module.exports = { getScopes };
  