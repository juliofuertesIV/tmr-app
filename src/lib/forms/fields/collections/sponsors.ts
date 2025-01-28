
import { IActionTarget, IFormField } from "@/types/forms";
import { isValidString, processBasicTextInput } from "../../validation/functions";

export const sponsorFields : { [key in IActionTarget]: IFormField[] } = { 
    creation: [
        {
            name: 'name',
            label: 'Nombre del patrocinador',
            instructions: null,
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            requiredForItemCreation: true
        },
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre del patrocinador',
            instructions: null,
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            requiredForItemCreation: true
        },
    ]
}