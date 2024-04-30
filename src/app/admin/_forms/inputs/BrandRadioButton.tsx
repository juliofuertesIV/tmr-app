import { IBrand } from '@/interfaces'
import React from 'react'

export default function BrandRadioButton({ checked, brand } : { checked: boolean, brand: IBrand }) {

    const { id } = brand
    
    return  <input type="radio" name="BrandId" value={ id } checked={ checked } readOnly />
}
