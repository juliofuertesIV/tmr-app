import { sequelize } from "@/database";
import { IOneOfCollectionNames } from "@/types";
import { getModelByCollectionName } from "../_utils";
import { constructAPIResponse } from "../../_utils";

export const GET = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string | number }}) => {

    const { id, collection } = params

    const { Model, options } = getModelByCollectionName(collection)

    try {
        const contest = await Model.findOne({ where: { id }, ...options }).then(data => data)
        return Response.json(
            constructAPIResponse({ 
                message: 'OK',
                success: true,
                error: null,
                data: contest 
            })
        )
    }
    catch (error) {
        return Response.json(
            constructAPIResponse({ 
                message: 'Failed to fetch',
                success: false,
                error,
                data: null 
            })
        )
    }
}

export const PUT = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string | number }}) => {

    const { id, collection } = params

    const { Model } = getModelByCollectionName(collection)

    const payload = Object.fromEntries(await req.formData())

    const transaction = await sequelize.transaction()

    try {
        const affectedRows = await Model.update({ ...payload }, { where: { id }, transaction })
        await transaction.commit()

        return Response.json(
            constructAPIResponse({ 
                message: "Elemento editado correctamente.",
                success: true,
                error: null,
                data: affectedRows 
            })
        )
    }
    catch (error) {
        await transaction.rollback();
        return Response.json(
            constructAPIResponse({ 
                message: "No se ha podido editar el elemento.",
                success: true,
                error,
                data: null 
            })
        )
    }
}

export const DELETE = async (req: Request, { params } : { params: { collection: IOneOfCollectionNames, id: string | number }}) => {

    const { id, collection } = params

    const { Model } = getModelByCollectionName(collection)

    const transaction = await sequelize.transaction()

    try {
        const elementsDestroyed = await Model.destroy({ where: { id }, transaction })
        await transaction.commit()

        return Response.json(
            constructAPIResponse({ 
                message: "Elemento eliminado correctamente.",
                success: true,
                error: null,
                data: elementsDestroyed
            })
        )
    }
    catch (error) {
        await transaction.rollback();
        return Response.json(
            constructAPIResponse({ 
                message: "No se ha podido eliminar el elemento.",
                success: true,
                error,
                data: null 
            })
        )
    }
}
