
const getVoteScopes = (models) => {

    const { Voter } = models
    
    return [
        {
            name: 'public',
            scope: {
                attributes: ["VoterId", "InscriptionId"],
            },
            name: 'detailed',
            scope: {
                include: [ Voter ],
            }
        }
    ]
}
  
  module.exports = { getVoteScopes };
  