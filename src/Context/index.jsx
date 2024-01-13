import {useState, createContext } from 'react'

// Context
export const Context = createContext(null)

// Component ContextProvider
export const ContextProvider = ({ children }) => {
    // state global - points
    const [points, setPoints] = useState(0)

    // state global - lives
    const [lives, setLives] = useState(3)

    return(
        <Context.Provider value={{points, setPoints, lives, setLives}}>
            {children}
        </Context.Provider>
    )
}