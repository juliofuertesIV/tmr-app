// src/scopes/contests.js

const getScopes = (models) => {

    const { Brand, State, SocialMedia, Param, Media } = models

    return {
      basic: {
        order: [["createdAt", "DESC"]],
        include: [
          { model: models.Inscription.scope('basic') },
          Brand,
          State,
        ],
      },
      detailed: {
        order: [["createdAt", "DESC"]],
        include: [
          Brand,
          State,
          SocialMedia,
          Param,
          { model: Media, as: "Logo" },
          { model: Media, as: "Banner" },
          { model: Media, as: "Frame" },
          { model: Media, as: "Favicon" },
        ],
      },
      public: {
        order: [["createdAt", "DESC"]],
        include: [
          Brand,
          State,
          SocialMedia,
          Param,
          { model: Media, as: "Logo" },
          { model: Media, as: "Banner" },
          { model: Media, as: "Frame" },
          { model: Media, as: "Favicon" },
        ],
      },
    };
  };
  
  module.exports = { getScopes };
  