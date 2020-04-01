import React from 'react';
import Squares from './Squares.js'
import './App.css';
import sonic from './sonic.png';
import eggman from './eggman.png';

class Board extends React.Component{
    constructor(props){
        super()
        this.state={
            squares: ["","","","","","","","",""],
            playerOne: <img src={sonic} alt="sonic"/>,
            playerTwo: <img src={eggman} alt="eggman"/>,
            counter: 0,
            gameWin1: false,
            gameWin2:false,
            tieGame: false,
            playerTurn:"Sonic"
        }
    }


    winningCombos = () => {
      /*eslint-disable-next-line*/
        const {playerOne, playerTwo, squares, counter, gameWin2, gameWin1, tieGame} = this.state
        let winningArrays =[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]
        /*eslint-disable-next-line*/
        winningArrays.map(value => {
          /*eslint-disable-next-line*/
            var [a,b,c] = value
                if (squares[a] && squares[a] === squares[c] && squares[a] === squares[b] && squares[a] === playerOne)  {
                    this.setState({
                        gameWin1:true
                    })
                    window.setTimeout(function(){window.location.reload()}, 6000);
            } else if (squares[a] && squares[a] === squares[c] && squares[a] === squares[b] && squares[a] === playerTwo) {
                    this.setState({
                        gameWin2:true
                    })
                    window.setTimeout(function(){window.location.reload()}, 8000);
                }
        })
    }


    squareLocation = (index) => {
      /*eslint-disable-next-line*/
        const {playerOne, playerTwo, squares, counter, gameWin2, gameWin1, tieGame} = this.state
        let newCount = this.state.counter + 1
        if(this.state.counter%2 === 0 && squares[index] !== playerTwo && squares[index] === "" ){
            squares[index] = playerOne
            this.setState({
                squares: squares,
                counter:newCount,
                playerTurn:"Dr.Eggman"
            })
        } else if(this.state.counter%2 !== 0 && squares[index] !== playerOne && squares[index] === "" ){
            squares[index] = playerTwo
            this.setState({
                squares: squares,
                counter:newCount,
                playerTurn:"Sonic"
            })
        } else if (newCount >= 9) {
            this.setState({
                tieGame: true
            })
            window.setTimeout(function(){window.location.reload()}, 4000);
        }
    }



    render(){
        let {squares} = this.state
        let square = squares.map((value,index)=> {
            return (
                <Squares
                value = {value}
                index={index}
                key={index}
                squareLocation = {this.squareLocation}
                clickCounter = {this.clickCounter}
                winningCombos = {this.winningCombos}
                />
            )
        })
        return(
            <div>
                <h2 align="center" className="App" id="header">Sonic Tic Tac Toe</h2>
                <br />
                <div id = "player">
                  <h3>{this.state.playerTurn} is up!</h3>
                </div>
                <br />
                {!this.state.tieGame && !this.state.gameWin1 && !this.state.gameWin2 && <div id="gameboard">
                {square}
                </div>}
                {this.state.tieGame && !this.state.gameWin2 && !this.state.gameWin1 && <div id="tie">
                <img src = "https://66.media.tumblr.com/ff7024c20a6e3148a583b9547433affd/tumblr_nn62joGHLx1u5cb23o1_400.gif" alt="GIF"/>
                </div>}
                {this.state.gameWin2 && !this.state.tieGame && <div id="OWins">
                <img src = "https://66.media.tumblr.com/d88154420bdcfb32892af4c8d560bfc6/cd75c6affbb1752d-e0/s500x750/24bab7fee1681d03ed6efb684fed158a4370a2db.gif" alt="GIF"/>
                </div>}
                {this.state.gameWin1 && !this.state.tieGame && <div id="XWins">
                <img src = "https://thumbs.gfycat.com/HollowSinfulHyrax-small.gif" alt="GIF"/>
                </div>}
            </div>

        )
    }
}


export default Board;
