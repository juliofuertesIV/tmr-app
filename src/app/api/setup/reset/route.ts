
import { sequelize } from '@/lib/database'

export const GET = async () => {
    
    try {    
        await sequelize.sync({ force: true })
    }
    catch (error) {
        return Response.json({ message: 'Error purging database!', success: false, error })
    }
    
    return Response.json({ message: 'All the database is empty now!', success: true, error: null })
}

