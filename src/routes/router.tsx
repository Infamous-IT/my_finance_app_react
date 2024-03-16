import {createBrowserRouter} from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage.tsx';
import Layout from '../pages/Layout.tsx';
import Home from '../pages/Home.tsx';
import Transactions, {transactionAction, transactionLoader} from '../pages/Transactions.tsx';
import Category, {categoriesAction, categoryLoader} from '../pages/Category.tsx';
import Auth from '../pages/Auth.tsx';
import {ProtectedRoute} from '../components/ProtectedRoute.tsx';

export const router = createBrowserRouter(
    [
        {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                index: true,
                element: <Home/>,
            },
            {
                path: '/transactions',
                loader: transactionLoader,
                action: transactionAction,
                element:
                    <ProtectedRoute>
                        <Transactions/>
                    </ProtectedRoute>,
            },
            {
                path: '/category',
                action: categoriesAction,
                loader: categoryLoader,
                element:
                    <ProtectedRoute>
                        <Category/>
                    </ProtectedRoute>,
            },
            {
                path: '/auth',
                element: <Auth/>,
            }
        ],
            errorElement: <ErrorPage/>,
        }
    ]
)