// src/scopes/contests.js

const getMediaScopes = (models) => {
    return [
        {
            name: 'public',
            scope: {
                attributes: { exclude: ["folder", "filename", "role"]}
            },
        },
        { 
            name: 'detailed',
            scope: {
                order: [["createdAt", "DESC"]]
            }
        }
    ]
}

  module.exports = { getMediaScopes };
  