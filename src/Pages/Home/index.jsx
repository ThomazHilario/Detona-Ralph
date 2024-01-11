import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../../Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import './home.css'
export const Home = () => {

    // navigate
    const navigate = useNavigate()

    //state - nickname
    const [nickname, setNickname] = useState('')

    //state - email
    const [email, setEmail] = useState('')

    //state - password
    const [password, setPassword] = useState('')

    // Cadastrando usuario ao banco
    async function singIn(e){
        try {
            // cancelando o envio do formulario
            e.preventDefault()

            if(nickname !== ''){
                const user = await createUserWithEmailAndPassword(auth, email, password) 

                user.user.name = nickname
                
                navigate(`/game/${user.user.uid}`)
            }else{
                alert('preencha o campo de nickname')   
            }
        } catch (e) {
            console.log(e)
        }


    }

    return(
        <main id="home">

            <form id="cadastro">

                <div>
                    <label>Nickname:</label>
                    <input type="text" onChange={(e) => setNickname(e.target.value)}/>
                </div>

                <div>
                    <label>Email:</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div>
                    <button onClick={singIn}>Cadastrar</button>
                    <Link to='/game'>Jogar sem Cadastro</Link>
                </div>
            </form>

        </main>
    )
}