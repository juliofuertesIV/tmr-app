import Spinner from './Spinner'
import TMRLogo from './TmrLogo'

export default function AdminLoader() {
  return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex flex-col gap-8 items-center justify-center'>
                <div className='animate-pulse w-32'>
                    <TMRLogo/>
                </div>
                <div className='max-w-8'>
                    <Spinner/>
                </div>
            </div>
        </div>
    )
}
