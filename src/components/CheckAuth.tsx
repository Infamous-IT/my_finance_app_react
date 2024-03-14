import {FC, useEffect} from 'react';
import {useAppDispatch} from '../store/hooks.ts';
import {getTokenFromLocalStorage} from '../helpers/localstorage.helper.ts';
import {AuthService} from '../services/auth.service.ts';
import {login, logout} from '../store/user/userSlice.ts';
import {toast} from 'react-toastify';

export const CheckAuth: FC = () => {
    const dispatch = useAppDispatch();

    const checkAuth = async () => {
        const token = getTokenFromLocalStorage();
        try {
            if (token) {
                const data = await AuthService.getMe();
                if (data) {
                    dispatch(login(data));
                } else {
                    dispatch(logout());
                }
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <></>
    )
}

export default CheckAuth;