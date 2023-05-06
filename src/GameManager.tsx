import { Battle, FireResult, Ship } from './battle'

enum GameStatus {
  active,
  finals,
  finished,
}

enum GameResult {
  pending,
  winner,
  winners,
  tie,
}

enum PlayerStatus {
  active,
  waiting,
  winner,
  loser,
}

class GameManager {
  gameStatus: GameStatus
  gameResult: GameResult
  statuses: PlayerStatus[]
  players: number
  activePlayers: number
  winners: number

  constructor(players: number) {
    this.gameStatus = GameStatus.active
    this.gameResult = GameResult.pending
    this.statuses = Array(players).fill(PlayerStatus.active)
    this.players = players
    this.activePlayers = players
    this.winners = 0
  }

  endTurn(player: number, finishedGame: boolean) {
    const unfinishedStatus =
      this.gameStatus == GameStatus.active
        ? PlayerStatus.waiting
        : PlayerStatus.loser
    const newStatus =
      finishedGame === false ? unfinishedStatus : PlayerStatus.winner

    this.setStatus(player, newStatus)
    this.activePlayers--

    if (finishedGame === true) {
      this.winners++
    }

    if (finishedGame === true && this.gameStatus !== GameStatus.finals) {
      this.gameStatus = GameStatus.finals
      for (let i = 0; i < this.players; i++) {
        if (this.statuses[i] == PlayerStatus.waiting) {
          this.statuses[i] = PlayerStatus.loser
        }
      }
    }

    if (this.activePlayers != 0) {
      return
    }

    if (this.gameStatus !== GameStatus.finals) {
      this.statuses.fill(PlayerStatus.active)
      this.activePlayers = this.players

      return
    }

    this.gameStatus = GameStatus.finished

    if (this.winners === 1) {
      this.gameResult = GameResult.winner
    } else if (this.winners < this.players) {
      this.gameResult = GameResult.winners
    } else {
      // winners === players
      this.gameResult = GameResult.tie
    }
    console.log(this)
  }

  setStatus(player: number, newStatus: PlayerStatus) {
    const transitions = {
      [PlayerStatus.active]: [
        PlayerStatus.waiting,
        PlayerStatus.winner,
        PlayerStatus.loser,
      ],
      [PlayerStatus.waiting]: [PlayerStatus.active, PlayerStatus.loser],
      [PlayerStatus.winner]: [],
      [PlayerStatus.loser]: [],
    }

    const oldStatus = this.statuses[player]
    const isValid = transitions[oldStatus].some((s) => s === newStatus)

    if (!isValid) {
      throw 'Invalid transition'
    }

    this.statuses[player] = newStatus
  }
}

export default GameManager
export { GameStatus, GameResult, PlayerStatus }
