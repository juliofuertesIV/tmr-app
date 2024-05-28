type IValidationProps = {
    value: string,
    validationMethod: ((value: string, testAgainst: string | null) => boolean) | null,
    processingMethod: ((value: string) => string) | null,
    testAgainst: string | null
}

export const validateInput = ({ value, validationMethod, testAgainst, processingMethod } : IValidationProps) => {

    if (!value) return { value, isValid: null }

    const inputIsValid = validationMethod === null ? true : validationMethod(value, testAgainst)

    if (!inputIsValid) return { value, isValid: false }
    
    const processed = processingMethod ? processingMethod(value) : value

    return { value: processed, isValid: true }
}