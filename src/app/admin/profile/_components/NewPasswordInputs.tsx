'use client'
import Label from '@/lib/forms/components/label/Label'
import React, { ChangeEvent, useState } from 'react'

export default function NewPasswordInputs() {


    const [ newPassword, setNewPassword ] = useState<string | null>(null)
    const [ confirmedNewPassword, setConfirmedNewPassword ] = useState<string | null>(null)

    const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            setNewPassword(null)
        }
        setNewPassword(e.currentTarget.value)
    }

    const onChangeConfirmNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            setConfirmedNewPassword(null)
        }
        setConfirmedNewPassword(e.currentTarget.value)
    }

    const checkIfPasswordIsValid = (password: string) => true

    const checkIfPasswordIsConfirmed = () => confirmedNewPassword == newPassword

    const isNewPasswordValid = !newPassword ? null : checkIfPasswordIsValid(newPassword)
    
    const isConfirmedPassword = !confirmedNewPassword ? null : (!newPassword ? false : checkIfPasswordIsConfirmed())

    return (
        <>
            <Label textContent={ "Nueva contraseña" } isValid={ isNewPasswordValid }>
                <input
                    className="pl-2 w-full bg-neutral-800 text-neutral-200 rounded-xl py-1 data-[readonly='true']:text-neutral-500 data-[readonly='true']:cursor-not-allowed"
                    name={ 'password' }
                    type={ 'password' }
                    onChange={ onChangeNewPassword }
                    required={ false }
                />
                <small className='text-neutral-400'>Elige una nueva contraseña</small>
            </Label>
            <Label textContent={ "Confirma tu nueva contraseña" } isValid={ isConfirmedPassword }>
                <input
                    className="pl-2 w-full bg-neutral-800 text-neutral-200 rounded-xl py-1 data-[readonly='true']:text-neutral-500 data-[readonly='true']:cursor-not-allowed"
                    type={ 'password' }
                    onChange={ onChangeConfirmNewPassword }
                    required={ !!newPassword }
                />
                <small className='text-neutral-400'>Repite tu nueva contraseña</small>
            </Label>
        </>
    )
}
