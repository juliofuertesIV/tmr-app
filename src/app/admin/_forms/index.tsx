const contest = [
    {
        name: 'name',
        label: 'Nombre',
        required: true,
    },
    {
        name: 'domain',
        label: 'Dominio',
        required: true
    },
    {
        name: 'year',
        label: 'Año de la edición',
        required: true
    },
    {
        name: 'bannerHref',
        label: 'Enlace del banner',
        required: false
    },
    {
        name: 'metaUrl',
        label: 'URL del concurso',
        required: false
    },
    {
        name: 'postmarkToken',
        label: 'Token de Postmark',
        
        required: false
    },
    {
        name: 'postmarkSenderAddress',
        label: 'Dirección de envío de Postmark',
        required: false
    },
    {
        name: 'metaTitle',
        label: 'Meta título de la web',
        required: false
    },
    {
        name: 'metaDescription',
        label: 'Meta descripción de la web',
        required: false
    },
    {
        name: 'metaPixelId',
        label: 'ID del Píxel de Meta',
        required: false
    },
    {
        name: 'googleTagManagerId',
        label: 'ID de Google Tag Manager',
        required: false
    },
    {
        name: 'googleAnalyticsId',
        label: 'ID de Google Analytics',
        required: false
    }
]

export { contest }