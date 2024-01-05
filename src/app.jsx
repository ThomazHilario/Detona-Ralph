import { ContextProvider } from './Context'
import { Header } from './Components/Header'
import { MainGame } from './Components/MainGame'
import './app.css'

export const App = () => {

  return (
    <>
      <ContextProvider>
        {/* Componente Header */}
        <Header/>

        {/* Componente MainGame */}
        <MainGame/>
      </ContextProvider>
    </>
  )
}
