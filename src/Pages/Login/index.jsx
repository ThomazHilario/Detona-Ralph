import { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'

export const Login = () => {

    // state - email
    const [email, setEmail] = useState('')

    // state - password
    const [password, setPassword] = useState('')

    return(
        <main className="mainLogin">
            <form>

                <div>
                    <label>Email:</label>
                    <input type="text" value={email}/>
                </div>

                <div>
                    <label>Password:</label>
                    <input type="text" value={password}/>
                </div>

                <div>
                    <button>Entrar</button>
                    <Link to='/' className='navigateHome'>Não possui uma conta ? <strong>Cadastre-se</strong></Link>
                </div>

            </form>
        </main>
    )
}