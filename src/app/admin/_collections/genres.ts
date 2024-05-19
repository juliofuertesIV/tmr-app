import { IFormField, IActionTarget } from "@/types/forms"

export const genreFields = {
    creation: [
        {
            name: 'name',
            label: 'Nombre del género',
            required: true,
            type: 'text' 
        }
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre del género',
            required: false,
            type: 'text' 
        },
    ]    
} as {
    [key in IActionTarget]: IFormField[]
}
