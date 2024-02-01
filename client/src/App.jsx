import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header.jsX'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'



export default function App() {
  return (
    <BrowserRouter >
    <Header/>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/about'  element={<About/>}/>
        <Route path='/sign-in'  element={<SignIn/>}/>
        <Route path='/sign-up'  element={<SignUp/>}/>
        <Route path='/dashboard'  element={<Dashboard/>}/>
        <Route path='/projects'  element={<Projects/>}/>


        </Routes>
       <Footer/>
    </BrowserRouter>
  )
}
