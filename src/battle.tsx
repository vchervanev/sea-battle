export enum FireResult {
  Miss,
  Hit,
  Destroyed,
}
export interface Battle {
  fire: (row: number, col: number) => FireResult
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

  fire(row: number, col: number): FireResult {
    if (
      row < this.row ||
      row > this.maxRow ||
      col < this.col ||
      col > this.maxCol
    ) {
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
}

class RandomBattle implements Battle {
  ships: Ship[]
  activeShips: number
  constructor() {
    this.ships = [new Ship(2, 2, 2, false), new Ship(0, 0, 3, true)]
    this.activeShips = this.ships.length
  }

  fire(row: number, col: number): FireResult {
    let result = FireResult.Miss

    this.ships.find((ship) => {
      result = ship.fire(row, col)

      if (result == FireResult.Destroyed) {
        this.activeShips--
      }
      if (result != FireResult.Miss) {
        return true
      }
    })
    console.log({ result })
    return result
  }

  isGameOver(): boolean {
    return this.activeShips == 0
  }
}

export { Ship, RandomBattle }
