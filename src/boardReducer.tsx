import { Battle, FireResult } from './battle'
import { BoardState } from './Board'
import { Status } from './Cell'

type TaskType = 'fire'

type FireTaskType = {
  type: TaskType
  battle: Battle
  col: number
  row: number
}

const boardReducer = (boardState: BoardState, task: FireTaskType) => {
  if (task.type == 'fire') {
    const fireResult = task.battle.fire(task.row, task.col)
    let cells: number[][] = []
    let status: Status

    switch (fireResult) {
      case FireResult.Miss:
        status = Status.Miss
        cells.push([task.row, task.col])
        break
      case FireResult.Hit:
        status = Status.Hit
        cells.push([task.row, task.col])
        break
      case FireResult.Destroyed:
        const ship = task.battle.getDestroyedShip(task.row, task.col)
        status = Status.Killed
        cells = ship.cells()
        break
      default:
        status = Status.Unknown
    }
    const newStatuses: { [key: string]: Status } = {}
    cells.forEach(([row, col]) => {
      const key = 'cell' + (row * 10 + col)
      newStatuses[key] = status
    })
    boardState = { ...boardState, ...newStatuses  }
  }
  return boardState
}

export default boardReducer
