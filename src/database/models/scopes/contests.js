// src/scopes/contests.js

const getScopes = (models) => {

    const { Brand, State, SocialMedia, Param, Genre, Media } = models

    return {
      basic: {
        order: [["createdAt", "DESC"]],
        include: [
          { model: models.Inscription, attributes: ["id", "verified"] },
          Brand,
          State,
          SocialMedia,
          Param,
          Genre,
        ],
      },
      admin: {
        order: [["createdAt", "DESC"]],
        include: [
          Brand,
          State,
          SocialMedia,
          Param,
          Genre,
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
          Genre,
          { model: Media, as: "Logo" },
          { model: Media, as: "Banner" },
          { model: Media, as: "Frame" },
          { model: Media, as: "Favicon" },
        ],
      },
    };
  };
  
  module.exports = { getScopes };
  