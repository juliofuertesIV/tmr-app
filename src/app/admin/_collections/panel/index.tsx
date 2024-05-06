
import { IBrand, IOneOfCollectionNames, IOneOfCollections } from "@/interfaces";
import AdminEditionForm from "../../_forms/AdminEditionForm";
import ContestBrands from "../../_contests/panel/ContestBrands";
import ContestParams from "../../_contests/panel/ContestParams";
import ContestStates from "../../_contests/panel/ContestStates";
import ContestMediaManager from "../../_contests/panel/ContestMediaManager";
import { ComponentProps } from "react";

const panels = {
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
                Element: ({ item } : { item: any }) => JSX.Element
            }
        }
    } 
}

export const getCollectionElementPanel = ({ 
    collection,
} : { 
    collection: IOneOfCollectionNames
}) => panels[collection]
