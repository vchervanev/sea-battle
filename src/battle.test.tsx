import { FireResult, RandomBattle, Ship } from './battle'

const battle = () => new RandomBattle()

describe('Ship', () => {
  const ship = ({ row = 3, col = 3, size = 2, vertical = true }) =>
    new Ship(row, col, size, vertical)

  it('fire vertical', () => {
    const s = ship({})
    expect(s.fire(0, 0)).toBe(FireResult.Miss)
    expect(s.fire(5, 3)).toBe(FireResult.Miss)
    expect(s.fire(3, 3)).toBe(FireResult.Hit)
    expect(s.fire(4, 3)).toBe(FireResult.Destroyed)
  })

  it('fire horizontal', () => {
    const s = ship({ vertical: false })
    expect(s.fire(3, 2)).toBe(FireResult.Miss)
    expect(s.fire(3, 5)).toBe(FireResult.Miss)
    expect(s.fire(3, 3)).toBe(FireResult.Hit)
    expect(s.fire(3, 4)).toBe(FireResult.Destroyed)
  })

  it('returns cells', () => {
    const s = ship({})
    expect(s.cells()).toEqual([
      [3, 3],
      [4, 3],
    ])
  })
})

describe('Battle', () => {
  test('fire', () => {
    const b = battle()
    expect(b.fire(5, 5)).toBe(FireResult.Miss)

    expect(b.fire(0, 0)).toBe(FireResult.Hit)
    expect(b.fire(2, 0)).toBe(FireResult.Hit)
    expect(b.fire(1, 0)).toBe(FireResult.Destroyed)
    expect(b.isGameOver()).toBeFalsy()

    expect(b.fire(2, 3)).toBe(FireResult.Hit)
    expect(b.fire(2, 2)).toBe(FireResult.Destroyed)
    expect(b.isGameOver()).toBeTruthy()
  })

  test('getDestroyedShip', () => {
    const b = battle()
    expect(() => b.getDestroyedShip(0, 0)).toThrowError('Invalid state')
    expect(b.fire(2, 3)).toBe(FireResult.Hit)
    expect(b.fire(2, 2)).toBe(FireResult.Destroyed)
    expect(b.getDestroyedShip(2, 3)).toEqual(
      expect.objectContaining({ col: 2, row: 2, hp: 0 }),
    )
  })
})
