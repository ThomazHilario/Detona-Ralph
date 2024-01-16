import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { MainGame } from '../Components/MainGame'
import { Home } from '../Pages/Home'
import Login from '../Pages/Login'
import { Ranking } from '../Pages/Ranking'
import { Error } from '../Pages/Error'

// Componente de Rotas
export const RoutesPage = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/login' element = { <Login/> }/>
                <Route path='/game' element={ <MainGame/> }/>
                <Route path='/ranking' element={ <Ranking/> }/>

                {/* Page not Found */}
                <Route path='*' element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}