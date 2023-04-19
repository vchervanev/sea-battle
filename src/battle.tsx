export enum FireResult {
  Miss,
  Hit,
  Destroyed,
}
export interface Battle {
  fire: (row: number, col: number) => FireResult
  getDestroyedShip: (row: number, col: number) => Ship
  isGameOver: () => boolean
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

class RandomBattle implements Battle {
  ships: Ship[]
  activeShips: number
  constructor() {
    this.ships = [new Ship(2, 2, 2, false), new Ship(0, 0, 3, true)]
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
}

export { Ship, RandomBattle }
