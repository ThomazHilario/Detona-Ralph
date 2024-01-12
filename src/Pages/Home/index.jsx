import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { database, auth } from '../../Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
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

    // rankingUser - Cadastrando usuario ao ranking
    async function rankingUser(uid){
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
    async function singIn(e){
        try {
            // cancelando o envio do formulario
            e.preventDefault()

            if(nickname !== ''){
                // Cadastrando usuario ao banco de dados
                const user = await createUserWithEmailAndPassword(auth, email, password) 

                // Colocando o nickname no usuario
                user.user.providerData[0].displayName = nickname
                
                // Salvando dados na localStorage
                localStorage.setItem('@user',JSON.stringify(user.user))

                // Adicionando usuario ao Ranking
                rankingUser(user.user.uid)

                // Navegando ate o jogo
                navigate('/game')
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
                    <input type="text"  value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                </div>

                <div>
                    <label>Email:</label>
                    <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div>
                    <button onClick={singIn}>Cadastrar</button>
                    <Link to='/login' className='navigateLogin'>Já possui uma conta? <strong>Entrar agora</strong></Link>
                    <Link to='/game' className='playGame'>Jogar sem Cadastro</Link>
                </div>
            </form>

        </main>
    )
}