
import { IOneOfCollectionNames } from "@/interfaces";
import AdminEditionForm from "../forms/AdminEditionForm";
import ContestBrands from "../forms/contests/ContestBrands";
import ContestParams from "../forms/contests/ContestParams";
import ContestStates from "../forms/contests/ContestStates";
import ContestMediaManager from "../forms/contests/ContestMediaManager";

export const panelsByCollectionName = {
    contests: {
        navItems: [
            { name: 'Información', value: 'info' },
            { name: 'Estado', value: 'states' },
            { name: 'Configuración', value: 'params' },
            { name: 'Imágenes', value: 'media' },
            { name: 'Branding', value: 'brands' }
        ],
        sections: {
            info: { 
                Element: AdminEditionForm 
            },
            brands: { 
                Element: ContestBrands 
            },
            params: { 
                Element: ContestParams 
            },
            states: { 
                Element: ContestStates 
            },
            media: { 
                Element: ContestMediaManager 
            },
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
                Element: ({ item } : { item: any /* TO DO: FIX THIS  */ }) => JSX.Element
            }
        }
    } 
}
