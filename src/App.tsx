import React from 'react'
import './App.css'
import Board from './Board'
import { RandomBattle } from './battle'
import { Battle } from './battle'
import GameManager, { PlayerStatus } from './GameManager'
import BattleManagerProxy from './BattleManagerProxy'

type Props = {}
type State = {
  game: GameManager,
  battle1: Battle
  battle2: Battle
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const battle1 = new RandomBattle()
    const battle2 = new RandomBattle()
    const game = new GameManager(2)
    const rerender = () => this.setState({...this.state})
    const proxy1 = new BattleManagerProxy(0, battle1, game, rerender)
    const proxy2 = new BattleManagerProxy(1, battle2, game, rerender)
    this.state = { game, battle1: proxy1, battle2: proxy2 }
  }

  render() {
    const p1_active = this.state.game.statuses[0] == PlayerStatus.active
    const p2_active = this.state.game.statuses[1] == PlayerStatus.active

    return (
      <div className="game-board">
        <Board active={p1_active} battle={this.state.battle1} />
        <Board active={p2_active}  battle={this.state.battle2} />
      </div>
    )
  }
}
export default App
