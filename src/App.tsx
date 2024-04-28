
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
import AllUsers from './root/pages/AllUser'
import Profile from './root/pages/Profile'
import { Save } from 'lucide-react'
import Saved from './root/pages/Saved'

const App =()=>{
    return(
     <main className='flex h-screen'>
        <Routes>
            <Route element={<AuthLayout/>}>
        
            <Route path='/sign-in' element={<SigninForm/>}/>
            <Route  path='/sign-up' element={<SignupForm/>}/>
          
            </Route>
            <Route  element={<RootLayout/>}>
            
             <Route index element={<Home/>}/>
                
             <Route path='/all-users' element={<AllUsers/>}/>
             <Route path='/saved' element={<Saved/>}/>
             <Route path='/create-post' element={<CreatePost/>}/>
              <Route path='/update-post/:id' element={<EditPost/>}/>
              <Route path='/posts/:id' element={<PostDetail/>}/>
              <Route path='/explore' element={<Explore/>}/>
              <Route path='/profile/:id' element={<Profile/>}/>
            </Route>

        </Routes>
     </main>
    )
}
export default App