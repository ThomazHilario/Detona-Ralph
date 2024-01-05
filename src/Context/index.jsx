import {useState, createContext } from 'react'

// context
export const Context = createContext(null)

export const ContextProvider = ({ children }) => {
    const [points, setPoints] = useState(0)
    const [timer, setTimer] = useState(60)
    const [lives, setLives] = useState(3)

    return(
        <Context.Provider value={{points, setPoints, timer, setTimer, lives, setLives}}>
            {children}
        </Context.Provider>
    )
}