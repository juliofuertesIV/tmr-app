import React from 'react'

export default function InscriptionInfoInputs() {
    return (
        <fieldset>
            <label>
                <p>Nombre artístico</p>
                <input name="name" type='text'/>
            </label>
            <label>
                <p>Descripción</p>
                <textarea name="description" className='resize-none'/>
            </label>
        </fieldset>
    )
}
