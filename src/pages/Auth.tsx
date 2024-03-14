import React, {FC, useState} from 'react';
import {AuthService} from '../services/auth.service.ts';
import {toast} from 'react-toastify';
import {setTokenToLocalStorage} from '../helpers/localstorage.helper.ts';
import {useAppDispatch} from '../store/hooks.ts';
import {login} from '../store/user/userSlice.ts';
import {useNavigate} from 'react-router-dom';

const Auth:FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({email, password});

            if(data) {
                setTokenToLocalStorage('token', data.token);
                dispatch(login(data));
                toast.success('Successfully logged in!');
                navigate('/');
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString())
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.registration({ email, password });

            if (data) {
                toast.success('Account has been created!');
                setIsLogin(!isLogin);
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString())
        }
    }

    return (
        <div className='mt-40 flex flex-col justify-center items-center bg-slate-900 text-white'>
            <h1 className='text-center mb-10 text-xl'>
                {isLogin ? 'Login' : 'Registration'}
            </h1>

            <form
                className='flex w-1/3 flex-col mx-auto gap-5'
                onSubmit={isLogin ? loginHandler : registrationHandler}
            >
                <input
                    type="email"
                    className='input'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className='input'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className='btn btn-sky mx-auto'>
                    Submit
                </button>
            </form>

            <div className='flex justify-center mt-5'>
                {isLogin ? (
                    <button className='text-slate-300 hover:text-white' onClick={() => setIsLogin(!isLogin)}>
                        You don't have an account?
                    </button>
                ) : (
                    <button className='text-slate-300 hover:text-white' onClick={() => setIsLogin(!isLogin)}>
                        Already have an account?
                    </button>
                )}
            </div>
        </div>
    )
}

export default Auth;