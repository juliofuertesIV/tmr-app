import { IOneOfCollectionNames } from "@/types";
import { isValidSocialProfile, isValidUrl } from "./functions";

const validationCriteriaByCollection = {
    contests: {
        name: null,
        domain: isValidUrl,
        year: null,
        bannerHref: null,
        metaUrl: null,
        metaTitle: null,
        metaDescription: null,
        postmarkToken: null,
        postmarkSenderAddress: null,
        googleAnalyticsId: null,
        googleTagManagerId: null,
        metaPixelId: null
    },
    inscriptions: {
        name: null,
        description: null,
        spotify: null,
        instagram: isValidSocialProfile,
        tiktok: isValidSocialProfile,
        video: isValidUrl,
        image: null,
        contactName: null,
        email: null,
        phone: null,
        city: null
    },
    brands: {
        name: null,
        website: isValidUrl,
        instagramProfile: isValidSocialProfile,
        tiktokProfile: isValidSocialProfile,
        backgroundColor: null,
        foregroundColor: null,
        accentColor: null
    },
    social: {
        name: null,
        icon: null
    },
    genres: {
        name: null
    },
    managers: {
        name: null,
        email: null,
        password: null
    }
}

const getValidationCriteriaForInputField = ({ collection, fieldName } : { collection: IOneOfCollectionNames, fieldName: string }) => {

    const criteria = (validationCriteriaByCollection[collection] as any)[fieldName]

    return criteria 

}