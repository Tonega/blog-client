import Navbar from './components/NavBar'
import Home from './page/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Register from './page/Register'
import Login from './page/Login'
import Logout  from './page/Logout'
import CreateBlog from './CreateBlog'
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';


function App() {
  const { token } = useAuth();

  return (
    <div className='container'>
            <Navbar/>
            <Toaster/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>

        {/* protected Routes */}
        <Route path='/' element={<PrivateRoutes />}/>
          <Route path='/create' element={<CreateBlog />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App