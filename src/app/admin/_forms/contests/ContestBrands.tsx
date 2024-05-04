'use client'

import { IBrand, IContest } from "@/interfaces"
import AdminFormSubmit from "../AdminFormSubmit"
import { updateCollectionItem } from "@/app/_fetch/put"
import { useFormState } from "react-dom"
import { formInitialState } from "@/interfaces/forms"
import AdminFormFeedback from "../AdminFormFeedback"
import BrandRadioButton from "../inputs/BrandRadioButton"
import { useRef, useState } from "react"

export default function ContestBrands({ collectionElement, items } : { collectionElement: IContest, items: IBrand[] }) {
    
    const [ selectedBrandId, setSelectedBrandId ] = useState<number>(collectionElement.BrandId)

    const onSelectBrand = (brandId: number) => setSelectedBrandId(brandId)

    const boundAction = updateCollectionItem.bind(null, 'contests', collectionElement.id as string)
    
    const [state, formAction] = useFormState(boundAction, formInitialState)
    
    const form = useRef(null)

    return (
        <div>
            <form action={ formAction } ref={ form }> 
                <div className=" flex flex-col gap-2">
                    <h3 className="uppercase pb-2">Branding asociado:</h3>
                    {
                        items.map((brand, index) => {

                            const isSelected = selectedBrandId === brand.id

                            return (
                                <div key={ index }>
                                    <div 
                                        className="border border-neutral-100 px-4 py-1 text-center font-bold uppercase rounded-sm cursor-pointer text-sm"
                                        onClick={ () => onSelectBrand(parseInt(brand.id as string)) }
                                        style={{
                                            backgroundColor: isSelected ? brand.backgroundColor : '#212121',
                                            color: isSelected ? brand.foregroundColor : '#e9e9e9',
                                            border: isSelected ? `solid 2px ${ brand.accentColor }` : ''
                                        }}
                                    >
                                        <p>{ brand.name }</p>
                                    </div>
                                    <div className="hidden">
                                        <BrandRadioButton 
                                            key={ index }
                                            brand={ brand }
                                            checked={ isSelected }
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                <AdminFormSubmit/>
                <AdminFormFeedback state={ state }/>
                </div>
            </form>
        </div>
    )
}
