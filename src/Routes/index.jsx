import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { MainGame } from '../Components/MainGame'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'

// Componente de Rotas
export const RoutesPage = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/login' element = { <Login/> }/>
                <Route path='/game' element={ <MainGame/> }/>
            </Routes>
        </BrowserRouter>
    )
}