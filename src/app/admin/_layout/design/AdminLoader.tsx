import Spinner from './Spinner'
import TMRLogo from './TmrLogo'

export default function AdminLoader() {
  return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex gap-4 items-center justify-center'>
                <div className='animate-pulse'>
                    <TMRLogo/>
                </div>
                <div className='max-w-8'>
                    <Spinner/>
                </div>
            </div>
        </div>
    )
}
