import './App.css'
import {RouterProvider} from 'react-router-dom';
import {router} from './routes/router.tsx';
import CheckAuth from './components/CheckAuth.tsx';

function App() {
    return (
    <>
      <RouterProvider router={router}/>
        <CheckAuth/>
    </>
  )
}

export default App
