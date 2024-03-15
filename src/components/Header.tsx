import {FC} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {FaBtc, FaSignOutAlt} from 'react-icons/fa';
import {useAuth} from '../hooks/useAuth.ts';
import {useAppDispatch} from '../store/hooks.ts';
import {logout} from '../store/user/userSlice.ts';
import {removeTokenFromLocalStorage} from '../helpers/localstorage.helper.ts';
import {toast} from 'react-toastify';

export const Header: FC = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        removeTokenFromLocalStorage('token');
        toast.success('Successfully logged out!');
        navigate('/');
    }


    return (
        <header className='flex items-center bg-slate-800 p-4 shadow-sm backdrop:blur-sm'>
            <Link to='/'>
                <FaBtc size={20}/>
            </Link>

            {/* MENU */}
            {isAuth && (
                <nav className='mr-10 ml-auto'>
                        <ul className="flex items-center gap-5">
                            <li>
                                <NavLink to={'/'}
                                         className={({isActive} ) => isActive ? 'text-white' : 'text-white/50'}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/transactions'} className={({isActive} ) => isActive ? 'text-white' : 'text-white/50'}>
                                    Transactions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/category'} className={({isActive} ) => isActive ? 'text-white' : 'text-white/50'}>
                                    Categories
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
            )}

            {/* ACTIONS */}
            {
                isAuth ? (
                    <button className='btn btn-rose' onClick={logoutHandler}>
                        <span>Log Out</span>
                        <FaSignOutAlt/>
                    </button>
                ) : <Link className='py-2 text-white/50 hover:text-white ml-auto' to={'auth'}>
                    Log In / Sign In
                </Link>
            }
        </header>
    )
}

export default Header;