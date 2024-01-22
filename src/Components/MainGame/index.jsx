import './maingame.css'
import { Header } from '../Header'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../../Context'
import { database, auth } from '../../Firebase'
import { signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

// toast
import { toast } from 'react-toastify'

// icon logOut
import { IoSettingsOutline } from "react-icons/io5";

const gameSettings = {
    gameSpeed:600,
    stop:false,

}

export const MainGame = () => {

    useEffect(() => {

        if(localStorage.getItem('@user') !== null){

            // Pegando usuario armazenado na localStorage
            const user = JSON.parse(localStorage.getItem('@user'))

            async function getPlayer(){
                try {
                    // Montando referencia ao banco de dados
                    const docRef = doc(database,'Ranking','RankingUsers')

                    // Fazendo a requisicao ao banco de dados
                    const docSnap = await getDoc(docRef)

                    // Buscando player logado
                    const player = docSnap.data().Users.filter(element => element.id === user.uid)

                    // Salvando na state player, o player logado
                    setPlayer(player[0])
                } catch (e) {
                    console.log(e)
                }
            }

            // Executando getPlayer
            getPlayer()
        }else{
            // Alterando o conteudo do button
            document.querySelector('.btnlogOut').textContent = 'Login'

            // Pegando os campos de login
            const campo_login = document.querySelectorAll('.campo_login')

            // Percorrendo cada campo
            campo_login.forEach(campo => {

                // Alterando o display dos campos para block
                campo.style.display = 'block'
            })
        }

    },[])

    // state - Player
    const [player,setPlayer] = useState({})

    // Contextos globais
    const {points, setPoints, lives,setLives} = useContext(Context)

    // getPoints
    function getPoints(){
        setPoints(points + 1)
    }

    //loseLives
    function loseLives(){
        setLives(lives - 1)
    }

    // Click no painel
    function click(tag){
        if(tag.className.includes('ralph')){
            getPoints()
        } else{
            loseLives()
        }
        
    }

    // Função que será executada durante um intervalo de tempo
    function initLoad(){

        // capturando paineis
        const paineis = document.querySelectorAll('.painel')

        // Limpando o ralph de cada painel
        paineis.forEach(painel => {
            painel.classList.remove('ralph')
        })

        // Escolhendo um painel para colocar o ralph
        paineis[Math.floor(Math.random() * 9)].classList.add('ralph')

    }

    // StartGame
    function startGame(){
        // Executando o detonaalph
        const detonaRalph = setInterval(initLoad, gameSettings.gameSpeed)
        
        // Executando o timerSeconds
        const timerSeconds = setInterval(() => {
            document.getElementById('time').textContent = parseFloat(document.getElementById('time').textContent) - 1
        },1000)

        // Verificando o detonaRalph eo timerSeconds
        setInterval(() => {
        
            if(document.getElementById('time').textContent === '0'){

                // limpando os intervalos de tempo do timer e do detona ralph
                clearInterval(detonaRalph)
                clearInterval(timerSeconds)
               
                // Alterando display do modal e da gameInterface
                document.getElementById('timeOutModal').style.display = 'flex'
                document.getElementById('gameInterface').style.display = 'none'
    
            } else if(document.getElementById('lives').textContent === 'X0'){
    
                // limpando os intervalos de tempo do timer e do detona ralph
                clearInterval(detonaRalph)
                clearInterval(timerSeconds)

                // Alterando display do modal e da gameInterface
                document.getElementById('modalGamerOverPlay').style.display = 'flex'
                document.getElementById('gameInterface').style.display = 'none'
    
                // Alterando o valor do tempo para 60 segundos
                document.getElementById('time').textContent = '60'
    
            }
        
        },10)

    }

    // StartGame - iniciando o jogo
    function startPlaying(){
        document.getElementById('modalStart').style.display = 'none'

        document.getElementById('gameInterface').style.display = 'grid'

        // Alterando o display do settins_modal
        document.getElementById('settings_modal').style.display = 'none'
        
        // Comecando o jogo
        startGame()

        // Deixando em tela cheia
        document.querySelector('body').requestFullscreen()
    }

    // Abrindo modal de configuracao
    function openSettingsModal(){

        // Alterando display de acordo com a condicao
        if(document.getElementById('settings_modal').style.display === 'flex'){
            document.getElementById('settings_modal').style.display = 'none'

        } else{
            document.getElementById('settings_modal').style.display = 'flex'

        }   
        
    }    

    return(
        <>
            {/* Componente Header */}
            <Header/>

            {/* container game */}
            <main id='containerGame'>

                {/* ModalStartPlay */}
                <div id='modalStart'>
                    {/* titulo do modal */}
                    <h1>Bem-vindo ao jogo</h1>

                    {/* paragrafo de regra */}
                    <h2>Regras:</h2>

                    {/* Regras */}
                    <ul>
                        <li>Ao clicar em start o jogo irá começar.</li>
                        <li>Seu objetivo é clicar no quadro onde o Ralph está.</li>
                        <li>Caso clique no quadro onde o Ralph não está, perde uma vida de três.</li>
                        <li>Lembrando que a cada 60 segundos passados temos o <strong>timeout</strong>, e a cada retorno do timeOut o tempo que o Ralph aparece é dividido em 1.25!</li>
                        <li>Faça a maior pontuação que puder! 😉</li>
                    </ul>

                    {/* Startar o jogo */}
                    <button className='buttonCss' id='startPlay' onClick={startPlaying}>Start</button>
                </div>

                {/* ModalGamerOverPlay */}
                <ModalGamerOverPlay points={points} setPoints={setPoints} setLives={setLives} player={player} setPlayer={setPlayer} initLoad={initLoad} startGame={startGame} />

                {/* TimeOutModal */}
                <TimeOut points={points} initLoad={initLoad} startGame={startGame}/>

                {/* gameInterface */}
                <div id="gameInterface">
                    <div className="painel" id='0' onClick={(e) => click(e.target)}></div>
                    <div className="painel" id='1' onClick={(e) => click(e.target)}></div>
                    <div className="painel" id='2' onClick={(e) => click(e.target)}></div>
                    <div className="painel" id='3' onClick={(e) => click(e.target)}></div>
                    <div className="painel" id='4' onClick={(e) => click(e.target)}></div>
                    <div className="painel" id='5' onClick={(e) => click(e.target)}></div>
                    <div className="painel" id='6' onClick={(e) => click(e.target)}></div>
                    <div className="painel" id='7' onClick={(e) => click(e.target)}></div>
                    <div className="painel" id='8' onClick={(e) => click(e.target)}></div>
                </div>

                {/* logoutGame */}
                <button id='btnlogOutGame' onClick={openSettingsModal}><IoSettingsOutline size={100} color='white'/></button>

                <SettingsModal/>
            </main>
        </>    
    )
}

// Componente SettingsModal
function SettingsModal(){

    // state - e-mail
    const [email, setEmail] = useState('')

    // state - password
    const [password, setPassword] = useState('')

    // logOutGame - sair da conta
    async function logOutGame(){
        try {

            // Deslogando a conta
            await signOut(auth)

            // Removendo dados da localStorage
            if(localStorage.getItem('@user') !== null){
                localStorage.removeItem('@user')
            }

            // Notificação de saida
            toast.success(player.name + ' saiu')           
            
        } catch (e) {
            console.log(e)
        }
    }

    // logInGame - entrar na conta
    async function logInGame(){
        try {
            // Logando e armazenando informacoes na vaariavel user
            const user = await signInWithEmailAndPassword(auth, email, password)

            // Salvando na localStorage
            localStorage.setItem('@user',JSON.stringify(user.user))

            // Atualizando a pagina
            setTimeout(() => window.location.reload(),1000)

        } catch (e) {
            console.log(e)
        }
    }

    // Pegando elementos
    function getElements(tag){
        // Capturando elemento por meio do parametro passado.
        const campo_login = document.querySelectorAll(tag)

        // Percorrendo cada elemento.
        campo_login.forEach(campo => {

            // Verificando o display dos elementos e alterando seu display.
            if(campo.style.display === 'block'){
                campo.style.display = 'none'
            } else{
                campo.style.display = 'block'
            }
        })

    }

    function verifyAction(e){
        // Caso o textContent do button seja Sair
        if(e.target.textContent === 'Sair'){
            // Cancela o envio do formulario
            e.preventDefault()

            // Alterando o conteudo do button para Login
            e.target.textContent = 'Login'

            // Buscando elementos para alterar o display
            getElements('.campo_login')

            // Saindo da conta
            logOutGame()
        }else{
            // Cancelando envio do formulario
            e.preventDefault()

            // Alterando conteudo do button
            e.target.textContent = 'Sair'

            // Buscando elementos para alterar o display
            getElements('.campo_login')

            // Logando na conta
            logInGame()
        }
    }

    return(
        <div id="settings_modal">

            {/* LoginUser */}
            <form>
                <div className='campo_login'>
                    <label>E-mail</label>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className='campo_login'>
                    <label>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button onClick={verifyAction}className='btnlogOut'>Sair</button>
            </form>
        </div>
    )
}

// Componente de modalGamerOver
function ModalGamerOverPlay({points, setLives, setPoints,player,setPlayer, startGame}){

    // Salvando os pontos do player
    async function savePointsPlayer(){
        try {
            // Montando referencia ao banco de dados
            const docRef = doc(database,'Ranking','RankingUsers')

            // Fazendo a requisicao ao banco de dados
            const docSnap = await getDoc(docRef)

            // Armazenando collection a uma variavel
            const usersRanking = docSnap.data().Users

            // Alterando os pontos
            usersRanking.filter(i => i.id === player.id && i.points < player.points ? i.points = player.points : i)

            // Salvando no banco de dados
            await updateDoc(docRef,{
                Users:usersRanking
            })

        } catch (e) {
            console.log(e)
        }
    }

    // savePoints
    function savePoints(){
            // Caso tenha @user na localStorage
            if(localStorage.getItem('@user') !== null){
                // Salvando os pontos dp player
                player.points = points
    
                // Setando na state player
                setPlayer(player)
                
                // Salvando no banco de dados
                savePointsPlayer()
            }
    }

    // Recomecando o jogo
    function startPlayAgain(){
        console.log(player)
        // Caso tenha @user na localStorage
        if(localStorage.getItem('@user') !== null){
            // Salvando os pontos do player
            player.points = points

            // Setando na state player
            setPlayer(player)
            
            // Salvando no banco de dados
            savePointsPlayer()
        }

        // Resetando vidas e pontos
        setPoints(0)
        setLives(3)

        // Alterando o display dos modalGamerOverPLay
        document.getElementById('modalGamerOverPlay').style.display = 'none'

        // Alterando o display da gameInterface
        document.getElementById('gameInterface').style.display = 'grid'

        // Alterando o display do settins_modal
        document.getElementById('settings_modal').style.display = 'none'

        // Startando o jogo novamente
        startGame()

        // Deixando em tela cheia
        document.querySelector('body').requestFullscreen()
    }

    return(
        <div id='modalGamerOverPlay'>
            {/* Titulo */}
            <h2>Game Over</h2>

            {/* Points Player */}
            <h3>Points:{points}</h3>

            {/* Container btn */}
            <div id='containerBtn'>
                {/* startGame */}
                <button className='buttonCss' onClick={startPlayAgain}>Play Again</button>
                <Link className='buttonCss' to='/ranking' target='blank' onClick={savePoints}>Ranking</Link>
            </div>
        </div>
    )
}


// Componente TimeOut
function TimeOut({ points, startGame }){

    // Retornando pos timeOut
    function playReturn(){
        gameSettings.gameSpeed / 1.25

        // Alterando o display dos timeOutModal
        document.getElementById('timeOutModal').style.display = 'none'

        // Alterando o display dos gameInterface
        document.getElementById('gameInterface').style.display = 'grid'

        // Alterando o valor do tempo para 60 segundos
        document.getElementById('time').textContent = '60'

        // Startando game
        startGame()
    }

    return(
        <div id='timeOutModal'>
            {/* Titulo */}
            <h2>TimeOut</h2>

            {/* Points */}
            <h3>points:{points}</h3>

            <button className='buttonCss' id='btn-timeout' onClick={playReturn}>Return Play in 2x Speed</button>
        </div>
    )
}






/* forma alternativa

    // Percorrendo os players
            for(let i = 0;i < usersRanking.length; i++){
                // encontrando o layer logado 
                if(usersRanking[i].id === player.id){
                    
                    // caso a pontuacao seja maior que a anterior
                    if(player.points > usersRanking[i].points){

                        // Atualizamos os points
                        usersRanking[i].points = player.points
                    } 
                } 
            }

 */