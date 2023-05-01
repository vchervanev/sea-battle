import React from 'react'
import './App.css'
import Board from './Board'
import { RandomBattle } from './battle'
import { Battle } from './battle'

type Props = {}
type State = {
  battle1: Battle
  battle2: Battle
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const battle1 = new RandomBattle()
    const battle2 = new RandomBattle()

    this.state = { battle1, battle2 }
  }

  render() {
    return (
      <div className="game-board">
        <Board battle={this.state.battle1} />
        <Board battle={this.state.battle2} />
      </div>
    )
  }
}
export default App
