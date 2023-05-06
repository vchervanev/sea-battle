import GameManager, { PlayerStatus } from "./GameManager"
import { Battle, FireResult, Ship } from "./battle"

class BattleManagerProxy implements Battle {
  battle: Battle
  game: GameManager
  player: number
  onTurn: () => void

  constructor(player: number, battle: Battle, game: GameManager, onTurn: () => void) {
    this.player = player
    this.game = game
    this.battle = battle
    this.onTurn = onTurn
  }

  fire(row: number, col: number): FireResult {
    if (this.game.statuses[this.player] != PlayerStatus.active) {
      throw 'invalid turn'
    }
    const result = this.battle.fire(row, col)

    if (result == FireResult.Miss){
      this.game.endTurn(this.player, false)
    } else if (this.isGameOver()) {
      this.game.endTurn(this.player, true)
    }

    this.onTurn()

    return result
  }

  getDestroyedShip(row: number, col: number): Ship {
    return this.battle.getDestroyedShip(row, col)
  }

  isGameOver(): boolean {
    return this.battle.isGameOver()
  }
  hp(): number {
    return this.battle.hp()
  }
}

export default BattleManagerProxy
