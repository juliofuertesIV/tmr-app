
import { sequelize } from '@/database'

export const GET = async () => {
    
    try {    
        await sequelize.sync({ force: true })
    }
    catch (error) {
        console.log({ error })
        return Response.json({ message: 'Error purging database!', success: false, error })
    }
    
    return Response.json({ message: 'All the database is empty now!', success: true, error: null })
}

