'use client'

export default function ContactInfoInputs() {
    return (
        <fieldset>
            <label>
                <p>Nombre del contacto</p>
                <input name="contactName" type='text'/>
            </label>
            <label>
                <p>Teléfono del contacto</p>
                <input name="phone" type='text'/>
            </label>
            <label>
                <p>Email del contacto</p>
                <input name="email" type='text'/>
            </label>
        </fieldset>
    )
}
