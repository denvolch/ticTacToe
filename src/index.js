import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Square = props => {
  return (
    <button className="square"
	    onClick={ props.onClick }>
      { props.value }
    </button>
  )
}

class Board extends React.Component {
 // constructor( props ){
 //   super( props )
 //   this.state = {
 //     squares: new Array(9).fill( null ),
 //     xIsNext: true,
 //   }
 // }

  renderSquare = i => {
    return (
      <Square value={ this.props.squares[i] }
              onClick={ () => this.props.onClick(i) }/>
    )
  }

  //handleClick = i => {
  //  let squares = [ ...this.props.squares ]
  //  if ( this.calculateWinner( squares ) || squares[i] ) { 
  //    return
  //  }
  //  squares[i] = this.state.xIsNext ? 'X' : 'O'
  //  return this.setState({ 
  //     squares,
  //     xIsNext :!this.state.xIsNext,
  //  })
  //}
  //calculateWinner = squares => {
  //  const winTemplates = [
  //    [ 0, 1, 2 ],
  //    [ 0, 4, 8 ],
  //    [ 0, 3, 6 ],
  //    [ 1, 4, 7 ],
  //    [ 2, 5, 8 ],
  //    [ 2, 4, 6 ],
  //    [ 3, 4, 5 ],
  //    [ 6, 7, 8 ]
  //  ]
  //  for ( let i = 0; i < winTemplates.length; i++ ) {
  //   const [ a, b, c ] = winTemplates[i]
  //   if ( squares[a] &&
//	  squares[a] == squares[b] &&
//	  squares[a] == squares[c] ) {
//       return squares[a] 
  //   }
  //  } 
  //  return null
  //}

  render() {
    return (
      <div>
        <div className="status">{ this.props.status }</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      history: [
        { squares: Array(9).fill( null ) },
      ],
      xIsNext: true,
    }
		console.log( this.state )
  }

  handleClick = i => {
    const history = this.state.history
    const current = history[ history.length - 1 ]
    const squares = [ ...current.squares ]
	console.log( squares )
    if ( calculateWinner( squares ) || squares[i] ) { return } //защита от повторного нажатия

		squares[i] = this.state.xIsNext ? 'X' : 'O'
		
console.log( squares[i] )
    this.setState({
			history: history.concat([
				{ squares: squares, } 
			]),
      xIsNext: !this.state.xIsNext,
    })
	}

  render() {
    const history = this.state.history
    const current = history[ history.length - 1 ]
    const winner = calculateWinner( current.squares )

    let status
    if ( winner ) {
      status = `Победитель: игрок ${ winner }`
		} else {
      status = `Следующий ход: ${ this.state.xIsNext ? 'X' : 'O' }`
		}

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={ current.squares }
								 onClick={ i => this.handleClick(i) }
								 status={ status } />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

const calculateWinner = squares => {
  const winTemplates = [
    [ 0, 1, 2 ],
    [ 0, 4, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 2, 4, 6 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ]
  ]

  for ( let i = 0; i < winTemplates.length; i++ ) {

    const [ a, b, c ] = winTemplates[i]

		if ( squares[a] && 
				 squares[a] === squares[b] && 
				 squares[a] === squares[c] ) {
				return squares[a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
