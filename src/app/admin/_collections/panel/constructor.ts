
import { IOneOfCollectionNames, IOneOfCollections } from "@/interfaces";
import AdminEditionForm from "../forms/EditionForm";
import BrandManager from "../forms/contests/BrandManager";
import ParamsManager from "../forms/contests/ParamsManager";
import StateManager from "../forms/contests/StateManager";
import ContestMediaManager from "../forms/contests/ContestMediaManager";
import FooterManager from "../forms/contests/FooterManager";

export const panelsByCollectionName = {
    contests: {
        sections: []
    },
    inscriptions: {
        sections: []
    },
    brands: {
        sections: []
    },
    social: {
        sections: []
    },
    users: {
        sections: []
    }
}


export const itemPanelsByCollectionName = {
    contests: {
        navItems: [
            { name: 'Información', value: 'info' },
            { name: 'Estado', value: 'states' },
            { name: 'Configuración', value: 'params' },
            { name: 'Imágenes', value: 'media' },
            { name: 'Footer', value: 'footer' },
            { name: 'Branding', value: 'brands' }
        ],
        sections: {
            info: { 
                Element: AdminEditionForm 
            },
            brands: { 
                Element: BrandManager 
            },
            params: { 
                Element: ParamsManager 
            },
            states: { 
                Element: StateManager 
            },
            media: { 
                Element: ContestMediaManager 
            },
            footer: {
                Element: FooterManager
            }
        }
    },
    brands: {
        navItems: [
            { name: 'Información', value: 'info' },
        ],
        sections: {
            info: { Element: AdminEditionForm },
        }
    }
} as {
    [key in IOneOfCollectionNames]: { 
        navItems: { name: string, value: string }[],
        sections: {
            [key: string]: {
                Element: ({ item } : { item: IOneOfCollections }) => JSX.Element
            }
        }
    } 
}
