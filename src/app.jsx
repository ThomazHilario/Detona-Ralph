import { ContextProvider } from './Context'
import { RoutesPage } from './Routes'
import './app.css'

export const App = () => {

  return (
    <>
      <ContextProvider>
        <RoutesPage/>
      </ContextProvider>
    </>
  )
}
