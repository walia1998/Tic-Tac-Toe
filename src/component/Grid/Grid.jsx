import { useState } from "react"
import Card from "../card/Card"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import isWinner from "../../helpers/isWinner.js";

import './Grid.css'







function Grid({ numberOfCard }) {

    const [turn, setTurn] = useState(true); // false --> X, true --> O
    const [board, setBoard] = useState(Array(numberOfCard).fill("")); //[" ", " ", " "]
    const [winner, setWinner] = useState();

    function play(index) {
        console.log('Move Played');
        if (turn == true) {
            board[index] = "O";
        } else {
            board[index] = "X";
        }

        const win = isWinner(board, turn ? "O" : "X")
        if (win) {
            setWinner(win);
            toast(`Congratulation '${win}' win the game `); 
        }
        setBoard([...board]);
        setTurn(!turn);
    }

    function reset() {
        setBoard(Array(numberOfCard).fill(""));
        setTurn(true)
        setWinner(null);
    }

    return (
        <div>
            <ToastContainer position="top-center"/>
            <>
                {winner && (
                    <>
                        <h1 className="turn-heighlight">Winner is : {winner}</h1>
                        <button className="reset-button" onClick={reset}>Reset Game</button>
                        
                    </>
                )}
                <h1 className="turn-heighlight">Current turn : {(turn) ? "O" : "X"}</h1>

            </>

            <div className="grid">
                {board.map((value, idx) => (
                    <Card  gameEnd={winner ? true : false} onPlay={play} player={value} key={idx} index={idx} />
                ))}
            </div>

        </div>

    )

}

export default Grid