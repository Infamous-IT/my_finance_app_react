import {FC, ReactNode} from 'react';
import {useAuth} from '../hooks/useAuth.ts';
import img from '../assets/protected.png';


interface Props {
    children: ReactNode
}

export const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth();

    return (
        <>
            {
                isAuth ?
                    children :
                    <div className='flex flex-col justify-center items-center mt-20 gap-10'>
                        <h1 className='text-2xl'>For view this page you must be logged in!</h1>
                        <img src={img} alt="protected" className='w-1/3'/>
                    </div>
            }
        </>
    )
}