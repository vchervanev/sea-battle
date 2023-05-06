import GameManager, {
  GameResult,
  GameStatus,
  PlayerStatus,
} from './GameManager'

const newGM = (players: number) => new GameManager(players)

describe('GameManager', () => {
  describe('default state', () => {
    it('pending/active', () => {
      expect(newGM(3).gameStatus).toBe(GameStatus.active)
      expect(newGM(2).gameResult).toBe(GameResult.pending)
      expect(newGM(2).statuses).toEqual([
        PlayerStatus.active,
        PlayerStatus.active,
      ])
    })
  })

  describe('1 winner', () => {
    const gm = newGM(3)
    gm.endTurn(0, false)
    expect(gm.statuses).toEqual([
      PlayerStatus.waiting,
      PlayerStatus.active,
      PlayerStatus.active,
    ])

    gm.endTurn(1, true)
    expect(gm.statuses).toEqual([
      PlayerStatus.loser,
      PlayerStatus.winner,
      PlayerStatus.active,
    ])
    expect(gm.gameStatus).toEqual(GameStatus.finals)
    gm.endTurn(2, false)

    expect(gm.statuses).toEqual([
      PlayerStatus.loser,
      PlayerStatus.winner,
      PlayerStatus.loser,
    ])
    expect(gm.gameStatus).toEqual(GameStatus.finished)
    expect(gm.gameResult).toEqual(GameResult.winner)
  })

  describe('tie', () => {
    const gm = newGM(2)
    gm.endTurn(0, true)
    gm.endTurn(1, true)
    expect(gm.statuses).toEqual([
      PlayerStatus.winner,
      PlayerStatus.winner,
    ])
    expect(gm.gameStatus).toEqual(GameStatus.finished)
    expect(gm.gameResult).toEqual(GameResult.tie)
  })

  describe('2 winners', () => {
    const gm = newGM(3)
    gm.endTurn(0, false)
    gm.endTurn(1, true)
    gm.endTurn(2, true)
    expect(gm.statuses).toEqual([
      PlayerStatus.loser,
      PlayerStatus.winner,
      PlayerStatus.winner,
    ])
    expect(gm.gameStatus).toEqual(GameStatus.finished)
    expect(gm.gameResult).toEqual(GameResult.winners)
  })
})
