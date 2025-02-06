import React, { ChangeEvent } from "react"

export const emptyMediaFormState = ({ 
    setFile,
    setImageSize 
} : { 
    setFile: React.Dispatch<React.SetStateAction<File | null>>, 
    setImageSize: React.Dispatch<React.SetStateAction<{
        width: number | null;
        height: number | null;
    }>> 
}) => {

    setFile(null)
    setImageSize({ width: null, height: null })
}

export const manageMediaInputChange = ({ 
    e, 
    setFile,
    setImageSize 
} : { 
    e: ChangeEvent<HTMLInputElement>, 
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setImageSize: React.Dispatch<React.SetStateAction<{
        width: number | null;
        height: number | null;
    }>> 
}) => {

    if (!e.currentTarget.files) return emptyMediaFormState({ setFile, setImageSize })

    const file = e.currentTarget.files[0]
    setFile(file)
}