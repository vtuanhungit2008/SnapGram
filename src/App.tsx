
import { Route, Routes } from 'react-router-dom'
import './global.css'
import SignupForm from './auth/form/SignupForm'
import SigninForm from './auth/form/SigninForm'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import { Home } from './root/pages'
import CreatePost from './root/pages/CreatePost'
import EditPost from './root/pages/EditPost'
import PostDetail from './root/pages/PostDetail'
import Explore from './root/pages/Explore'

const App =()=>{
    return(
     <main className='flex h-screen'>
        <Routes>
            <Route element={<AuthLayout/>}>
            <Route  path='/sign-up' element={<SignupForm/>}/>
            <Route path='/sign-in' element={<SigninForm/>}/>
            </Route>
            <Route  element={<RootLayout/>}>
            
             <Route index element={<Home/>}/>
             
             <Route path='/all-users' element={<Home/>}/>
             <Route path='/saved' element={<Home/>}/>
             <Route path='/create-post' element={<CreatePost/>}/>
              <Route path='/update-post/:id' element={<EditPost/>}/>
              <Route path='/posts/:id' element={<PostDetail/>}/>
              <Route path='/explore' element={<Explore/>}/>
             
            </Route>

        </Routes>
     </main>
    )
}
export default App