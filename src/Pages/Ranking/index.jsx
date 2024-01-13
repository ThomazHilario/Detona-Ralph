import'./ranking.css'
import { useState, useEffect } from 'react'
import { database } from '../../Firebase'
import { doc, getDoc } from 'firebase/firestore'

export const Ranking = () => {

    // Usando o useEffect para buscar o array de ranking
    useEffect(() => {
        // loadPlayers
        async function loadPlayers(){
            // Montando referencia ao banco de dados
            const docRef = doc(database,'Ranking','RankingUsers')

            // Fazendo a requisicao ao banco de dados
            const docSnap = await getDoc(docRef)

            // organizando array por ordem crescente de pontos
            const rankingArray = docSnap.data().Users.sort((a,b) => b.points - a.points)

            // Salvando na state players
            setPlayers(rankingArray)
        }

        // Executando loadPlayers
        loadPlayers()
    },[])

    // state - players
    const [players,setPlayers] = useState([])

    return(
        <main id="mainRanking">
            <article id='ranking'>

                {/* Titulo do ranking */}
                <h1>Ranking</h1>

                <table>
                    {/* cabecalho da tabela */}
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Points</th>
                        </tr>
                    </thead>

                    {/* corpo da tabela*/}
                    <tbody>
                        {/* Percorrendo array da state players */}
                        {players.length > 0 ? players.map((player,idx) => {
                            return(
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{player.name}</td>
                                    <td>{player.points}</td>
                                </tr>
                            )
                        }) : <div></div>}
                    </tbody>


                </table>
            </article>
        </main>
    )
}