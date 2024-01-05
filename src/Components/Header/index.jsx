import {useContext} from 'react'
import { Context } from '../../Context'
import './header.css'
import player from '../../images/player.png'
export const Header = () => {
    const {points, timer, lives} = useContext(Context)
    return(
        <header>
            <div className='infoGame'>
                <span className='title'>YOUR POINTS:</span>
                <h2 id='points'>{points}</h2>
            </div>

            <div className='infoGame'>
                <span className='title'>TIME LEFT:</span>
                <h2 id='time'>60</h2>
            </div>

            <div className='infoGame'>
                <img src={player} alt="imagem de vidas" />
                <h2 id='lives'>X{lives}</h2>
            </div>
        </header>
    )
}