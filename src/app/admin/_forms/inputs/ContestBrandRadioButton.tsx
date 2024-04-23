import { IBrand } from '@/interfaces'
import React from 'react'

export default function ContestBrandRadioButton({ checked, brand } : { checked: boolean, brand: IBrand }) {

    const { id, name } = brand
    
    return  <input type="radio" name="BrandId" value={ id } checked={ checked } readOnly />
}
