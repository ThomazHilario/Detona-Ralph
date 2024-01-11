import {Link} from 'react-router-dom'
import './home.css'
export const Home = () => {

    // Cadastrando usuario ao banco
    function singOut(){
        
    }

    return(
        <main id="home">

            <form id="cadastro">
                <div>
                    <label>Email:</label>
                    <input type="text" />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="text" />
                </div>

                <div>
                    <button onClick={singOut}>Cadastrar</button>
                    <Link to='/game'>Jogar sem Cadastro</Link>
                </div>
            </form>

        </main>
    )
}