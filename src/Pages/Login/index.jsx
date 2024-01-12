import './login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {database, auth} from '../../Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const Login = () => {

    // navigate
    const navigate = useNavigate()

    // state - email
    const [email, setEmail] = useState('')

    // state - password
    const [password, setPassword] = useState('')

    // singInUser - logando usuario
    async function singInUser(e){
        try {

            // Cancelando envio do formulario
            e.preventDefault()

            // Logando usuario
            const user = await signInWithEmailAndPassword(auth, email, password)      

            // Salvando dados na localStorage
            localStorage.setItem('@user',JSON.stringify(user.user))

            // Navegando ate a rota do jogo
            navigate('/game')

        } catch (e) {
            console.log(e)
        }
    }

    return(
        <main className="mainLogin">
            <form>

                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div>
                    <button onClick={singInUser}>Entrar</button>
                    <Link to='/' className='navigateHome'>Não possui uma conta ? <strong>Cadastre-se</strong></Link>
                </div>

            </form>
        </main>
    )
}