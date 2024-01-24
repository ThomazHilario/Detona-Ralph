import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// hook-form
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    email:z.string(),
    password:z.string()
})

// Firebase
import {auth} from '../../Firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

// css
import './login.css'

export default function Login(){
    // register e handleSubmit
    const {register, handleSubmit} = useForm({resolver:zodResolver(schema)})


    // Verificando se o usuario ainda esta logado
    useEffect(() => {

        // Função de verificação
        function loginAuth(){
            onAuthStateChanged(auth,(user) => {
                if(user){

                    // Alterando a state loading
                    setLoading(false)

                    return navigate('/game')
                } else{

                    // Alterando a state loading
                    setLoading(false)

                    return false
                }
            })
        }

        // Executando loginAuth
        loginAuth()
    },[])

    // navigate
    const navigate = useNavigate()

    // state - loading
    const [loading,setLoading] = useState(true)

    // singInUser - logando usuario
    async function singInUser({email, password}){
        try {

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
            {loading === false ? 
                <form onSubmit={handleSubmit(singInUser)}>

                    <div>
                        <label>Email:</label>
                        <input type="text" {...register('email')}/>
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type="password" {...register('password')}/>
                    </div>

                    <div>
                        <button>Entrar</button>
                        <Link to='/' className='navigateHome'>Não possui uma conta ? <strong>Cadastre-se</strong></Link>
                    </div>

                </form> :
                
                <div id='loadingModal'>Loading...</div>
            }
        </main>
    )
}