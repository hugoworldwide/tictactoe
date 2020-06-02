import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }

    boxClick = (id) => {

        console.log("Box Clicked!. Your ID: ", id)
        // change the value from null to "X" at the array index number ID
        let squaresFromApp = this.props.squares
        if (this.calculateWinner(squaresFromApp) || squaresFromApp[id]) {
            return;
        }
        console.log("Square you got so far is", squaresFromApp)
        const val = this.props.isXNext ? 'X' : 'O';
        squaresFromApp[id] = val;
        console.log("After change", squaresFromApp)
        // this.setState({squares:squaresFromApp, isXNext: !this.props.isXNext})
        let newMoves = this.props.moves.concat([{ value: val, id: id }])

        this.props.setTheState({ squares: squaresFromApp, isXNext: !this.props.isXNext, moves: newMoves })
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }


    render() {
        const winner = this.calculateWinner(this.props.squares)
        let status = ''

        if (winner) {
            status = 'Winner is ' + winner
        } else {
            status = `Next Player : ${this.props.isXNext ? "X" : "O"}`
        }


        return (
            <div className="tictac">
                <h1>{status}</h1>
                <div  >Moves
                    {this.props.moves.map(move => (
                    <p>
                        {move.id} played {move.value}
                    </p>
                ))}

                </div>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}