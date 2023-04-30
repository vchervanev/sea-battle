export enum FireResult {
  Miss,
  Hit,
  Destroyed,
}
export interface Battle {
  fire: (row: number, col: number) => FireResult
  getDestroyedShip: (row: number, col: number) => Ship
  isGameOver: () => boolean
  hp: () => number
}

enum Position {
  Vertical,
  Horizontal,
}

class Ship {
  row: number
  maxRow: number
  col: number
  maxCol: number
  position: Position
  hits: boolean[]
  hp: number

  constructor(row: number, col: number, size: number, vertical: boolean) {
    this.row = row
    this.col = col
    this.position = vertical ? Position.Vertical : Position.Horizontal
    this.hits = []

    this.maxRow = vertical ? row + size - 1 : row
    this.maxCol = vertical ? col : col + size - 1
    this.hp = size
  }

  hitTest(row: number, col: number): boolean {
    return (
      row >= this.row &&
      row <= this.maxRow &&
      col >= this.col &&
      col <= this.maxCol
    )
  }

  fire(row: number, col: number): FireResult {
    if (!this.hitTest(row, col)) {
      return FireResult.Miss
    }

    const target = this.vertical() ? this.row - row : this.col - col

    if (this.hits[target] == true) {
      throw 'Invalid state'
    }

    this.hits[target] = true
    this.hp--

    return this.hp == 0 ? FireResult.Destroyed : FireResult.Hit
  }

  vertical(): boolean {
    return this.position == Position.Vertical
  }

  isAlive(): boolean {
    return this.hp != 0
  }

  cells(): number[][] {
    const result: number[][] = []
    let [col, row] = [this.col, this.row]

    while (this.maxCol >= col && this.maxRow >= row) {
      result.push([row, col])
      this.vertical() ? row++ : col++
    }

    return result
  }
}

const configuration: { size: number; count: number }[] = [
  { size: 4, count: 1 },
  { size: 3, count: 2 },
  { size: 2, count: 3 },
  { size: 1, count: 4 },
]

class BattleBuilder {
  ships: Ship[]
  constructor() {
    this.ships = []
  }

  run(): Ship[] {
    configuration.forEach(({ size, count }) => {
      while (true) {
        const ship = this.randomShip(size)
        if (this.isValid(ship)) {
          this.ships.push(ship)
          count--
          if (count == 0) {
            break
          }
        }
      }
    })

    return this.ships
  }

  // 0..9
  randomInt() {
    return Math.trunc(Math.random() * 10)
  }

  randomBool() {
    return Math.random() < 0.5
  }

  randomShip(size: number): Ship {
    return new Ship(this.randomInt(), this.randomInt(), size, this.randomBool())
  }

  isValid(ship: Ship): boolean {
    const around = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [1, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
    ]

    return ship
      .cells()
      .every(
        ([row, col]) =>
          row < 10 &&
          col < 10 &&
          this.ships.every((otherShip) =>
            around.every(
              ([dx, dy]) => otherShip.hitTest(row + dx, col + dy) == false,
            ),
          ),
      )
  }
}

class RandomBattle implements Battle {
  ships: Ship[]
  activeShips: number
  constructor() {
    this.ships = new BattleBuilder().run()
    this.activeShips = this.ships.length
  }

  fire(row: number, col: number): FireResult {
    const ship = this.findShip(row, col)

    if (ship == null) {
      return FireResult.Miss
    }

    const result = ship.fire(row, col)
    if (result == FireResult.Destroyed) {
      this.activeShips--
    }

    return result
  }

  findShip(row: number, col: number): Ship | null {
    return this.ships.find((ship) => ship.hitTest(row, col)) || null
  }

  isGameOver(): boolean {
    return this.activeShips == 0
  }

  getDestroyedShip(row: number, col: number): Ship {
    const ship = this.findShip(row, col)

    if (ship == null || ship.isAlive()) {
      throw 'Invalid state'
    }

    return ship
  }

  hp(): number {
    return this.activeShips
  }
}

export { Ship, RandomBattle }
