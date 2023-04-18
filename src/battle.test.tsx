import { FireResult, RandomBattle, Ship } from './battle'

const battle = () => new RandomBattle()

describe('Ship', () => {
  const ship = ({ row = 3, col = 3, size = 2, vertical = true }) =>
    new Ship(row, col, size, vertical)

  it('fire vertical', () => {
    const s = ship({})
    expect(s.fire(0, 0)).toBe(FireResult.Miss)
    expect(s.fire(3, 3)).toBe(FireResult.Hit)
    expect(s.fire(4, 3)).toBe(FireResult.Destroyed)
  })

  it('fire horizontal', () => {
    const s = ship({ vertical: false })
    expect(s.fire(3, 3)).toBe(FireResult.Hit)
    expect(s.fire(3, 4)).toBe(FireResult.Destroyed)
  })
})

test('Battle', () => {
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
