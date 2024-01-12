import { ContextProvider } from './Context'
import { RoutesPage } from './Routes'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

  return (
    <>
      <ToastContainer autoClose={1000}/>
      <ContextProvider>
        <RoutesPage/>
      </ContextProvider>
    </>
  )
}
