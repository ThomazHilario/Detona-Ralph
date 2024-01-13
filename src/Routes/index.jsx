import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { MainGame } from '../Components/MainGame'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'
import { Ranking } from '../Pages/Ranking'

// Componente de Rotas
export const RoutesPage = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <MainGame/> } />

                <Route path='/ranking' element = { <Ranking/> }/>
            </Routes>
        </BrowserRouter>
    )
}