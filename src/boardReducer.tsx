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
    const key = 'cell' + (task.row * 10 + task.col)
    const fireResult = task.battle.fire(task.row, task.col)
    let status
    switch (fireResult) {
      case FireResult.Miss:
        status = Status.Miss
        break
      case FireResult.Hit:
        status = Status.Hit
        break
      case FireResult.Destroyed:
        status = Status.Killed
        break
      default:
        status = Status.Unknown
    }
    boardState = { ...boardState, [key]: status }
  }
  return boardState
}

export default boardReducer
