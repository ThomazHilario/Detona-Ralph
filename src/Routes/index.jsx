import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { MainGame } from '../Components/MainGame'
// Componente de Rotas
export const RoutesPage = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <MainGame/> } />
            </Routes>
        </BrowserRouter>
    )
}