type Contest = {
    id: number,
    name: string,
    domain: string,
    year: number | string,
    bannerHref?: string,
    metaUrl?: string,
    metaTitle?: string,
    metaDescription?: string,
    postmarkToken?: string,
    postmarkSenderAddress?: string,
    googleAnalyticsId: string,
    googleTagManagerId: string,
    metaPixelId: string
}