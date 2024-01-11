import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { MainGame } from '../Components/MainGame'
import { Home } from '../Pages/Home'

// Componente de Rotas
export const RoutesPage = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/game' element={ <MainGame/> }/>

                <Route path='/game/:id' element={ <MainGame/> }/>
            </Routes>
        </BrowserRouter>
    )
}