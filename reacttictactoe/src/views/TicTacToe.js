import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import './TicTacToe.css'
import Square from "../components/Square";

class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 0,
            grid: null,
            turnP1:true,
            winner:0,
            count:-1
        };
        this.initGame = this.initGame.bind(this)
        this.squareClick = this.squareClick.bind(this)
    }

    initGame(size) {
        const tempGrid = Array(size).fill(Array(size).fill(0))
        const tempGridAsArray = [...tempGrid]
        const newGrid = tempGridAsArray.map((row) => {
            return [...row];
          });
        this.setState({
            size:size,
            grid:newGrid,
            turnP1:true,
            winner:0,
            count:0
        })
    } 

    resetGame() {
        this.setState({
            size: 0,
            grid: null,
            turnP1:true,
            winner:0,
            count:-1
        })
    }

    squareClick(x,y) {
        const newGrid = this.state.grid.map((x) => x);
        if(this.state.turnP1){
            newGrid[y][x] = 1
        } else {
            newGrid[y][x] = 2
        }
        let winV = true
        for (let i = 0; i<this.state.size;i++){
            if(newGrid[i][x] !== newGrid[y][x]) {
                winV = false
            }
        }
        let winH = true
        for (let i = 0; i<this.state.size;i++){
            if(newGrid[y][i] !== newGrid[y][x]) {
                winH = false
            }
        }
        let winD1 = true
        if(x===y) {
            for (let i = 0; i<this.state.size;i++){
                if(newGrid[i][i] !== newGrid[y][x]) {
                    winD1 = false
                }
            }
        } else {
            winD1 = false
        }
        let winD2 = true
        if(x===this.state.size-1-y) {
            for (let i = 0; i<this.state.size;i++){
                if(newGrid[this.state.size-1-i][i] !== newGrid[y][x]) {
                    winD2 = false
                }
            }
        } else {
            winD2 = false
        }
        let winner = 0;
        if(winV || winH || winD1 || winD2){
            if(this.state.turnP1){
                winner = 1
            } else {
                winner = 2
            }
        }
        
        this.setState({
            grid:newGrid,
            turnP1: !this.state.turnP1,
            winner:winner,
            count:this.state.count+1
        })
    }

    render() {

        let componet = this.state.count === this.state.size*this.state.size ?
        <Container className="box">
            <h1>Tie</h1>
            <Button onClick={()=> this.resetGame()}>New Game</Button>
        </Container>
        : this.state.winner !== 0 ?
        <Container className="box">
            <h1>Winner Player {this.state.winner}</h1>
            <Button onClick={()=> this.resetGame()}>New Game</Button>
        </Container>
        : this.state.size !== 0 ? 
        <Container className="box">
            {this.state.grid.map((row,i) => {
                return (
                    <Row className="text-center" key={i}>
                        {row.map((col,j) => {
                            return (
                                <Col className="cube"  key={j}>
                                    <Square y={i} x={j} callback={this.squareClick} turnP1={this.state.turnP1}/>
                                </Col>
                            )
                        })}
                    </Row>
                )
            })}
        </Container>
        :
        <Container className="box">
            <h1>Pick a size for the board</h1>
            <Button className="menuButton" onClick={()=>this.initGame(3)}>3</Button>
            <Button className="menuButton" onClick={()=>this.initGame(4)}>4</Button>
            <Button className="menuButton" onClick={()=>this.initGame(5)}>5</Button>
        </Container>
        return (
            componet
        )
    }
    
}

export default TicTacToe