import { useState, useEffect, useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { database, auth } from '../../Firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import './home.css'


export const Home = () => {

    // Buscando register e handleSubmit
    const {register, handleSubmit} = useForm()

    // Verificando se o usuario ainda esta logado
    useEffect(() => {

        // Função de verificação
        function loginAuth(){
            onAuthStateChanged(auth,(user) => {
                if(user){
                    // Alterando o valor da state loading
                    setLoading(false)

                    // Navegando ate a rota do jogo
                    return navigate('/game')
                    
                } else{
                    // Alterando o valor da state loading
                    setLoading(false)

                    return false
                }
            })
        }

        // Executando loginAuth
        loginAuth()
    },[])

    // state - loading
    const [loading, setLoading] = useState(true)

    // navigate
    const navigate = useNavigate()

    //state - nickname
    const nicknameRef = useRef()

    // rankingUser - Cadastrando usuario ao ranking
    async function rankingUser(uid,nickname){
        try {

            // Pegando a referência ao banco de dados do RankingUsers
            const docRef = doc(database,'Ranking','RankingUsers')
            
            // Buscando a coleção do ranking dos usuarios
            const docSnap = await getDoc(docRef)

            // Criando uma variavel que armazenará todos os usuarios
            const usersgeral = docSnap.data().Users

            // Jogando para dentro do array dos usuarios o novo usuario cadastrado
            usersgeral.push({id:uid,name:nickname,points:0})

            // Inserindo o novo array de usuarios ao banco de dados de ranking
            await setDoc(doc(database,'Ranking','RankingUsers'),{
                Users:usersgeral
            })
            
        } catch (e) {
            console.log(e)
        }
    }


    // Cadastrando usuario ao banco
    async function singIn({email, password}){
        try {
            // Salvando nickname na variavel
            const nickname = nicknameRef.current?.value

            if(nicknameRef !== ''){
                // Cadastrando usuario ao banco de dados
                const user = await createUserWithEmailAndPassword(auth, email, password) 

                // Colocando o nickname no usuario
                user.user.providerData[0].displayName = nickname
                
                // Salvando dados na localStorage
                localStorage.setItem('@user',JSON.stringify(user.user))

                // Adicionando usuario ao Ranking
                rankingUser(user.user.uid,nickname)

                // Navegando ate o jogo
                navigate('/game')

                setTimeout(() => window.location.reload(),1000)
            }else{
                alert('preencha o campo de nickname')   
            }
        } catch (e) {
            console.log(e)
        }


    }

    return(
        <main id="home">

            { loading === false ? 
                <form id="cadastro" onSubmit={handleSubmit(singIn)}>

                    <div>
                        <label>Nickname:</label>
                        <input type="text"  ref={nicknameRef}/>
                    </div>

                    <div>
                        <label>Email:</label>
                        <input type="text"  {...register('email')}/>
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type="password"  {...register('password')}/>
                    </div>

                    <div>
                        <button>Cadastrar</button>
                        <Link to='/login' className='navigateLogin'>Já possui uma conta? <strong>Entrar agora</strong></Link>
                        <Link to='/game' className='playGame'>Jogar sem Cadastro</Link>
                    </div>
                </form> :
                
                <div id='loadingModal'>Loading...</div>
            }

        </main>
    )
}