import { Link } from 'react-router-dom'
import { IoMdReturnLeft } from "react-icons/io";
import './error.css'

export const Error = () => {
    return(
        <main id="mainError">
            <h1>Error 404</h1>
            <Link to='/'><IoMdReturnLeft size={40} /> Voltar</Link>
        </main>
    )
}