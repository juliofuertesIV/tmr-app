// src/scopes/contests.js

const getContestScopes = (models) => {

    const { Brand, State, SocialMedia, Param, Media, Footer, Sponsor, Inscription } = models
 
    return [
        { 
            name: 'basic',
            scope: {
                order: [["createdAt", "DESC"]],
                include: [
                    { model: Inscription },
                    Brand,
                    State,
                ],
            },
        },
        { 
            name: 'detailed',
            scope: {
                order: [["createdAt", "DESC"]],
                include: [
                    Brand,
                    State,
                    SocialMedia,
                    Param,
                    { model: Footer, 
                        include: [ 
                            { model: Sponsor, include: [ Media ]}
                        ]
                    },
                    { model: Media, as: "Logo" },
                    { model: Media, as: "Banner" },
                    { model: Media, as: "Frame" },
                    { model: Media, as: "Favicon" },
                ],
            },
        },
        { 
            name: 'public',
            scope: {
                order: [["createdAt", "DESC"]],
                include: [
                    Brand,
                    State,
                    SocialMedia,
                    Param,
                    { model: Footer, include: [ Sponsor ]},
                    { model: Media, as: "Logo" },
                    { model: Media, as: "Banner" },
                    { model: Media, as: "Frame" },
                    { model: Media, as: "Favicon" },
                ],
            },
        }
    ]

}

  
module.exports = { getContestScopes };
  