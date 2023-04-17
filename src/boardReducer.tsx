import { BoardState } from "./Board"
import { Status } from "./Cell"

type TaskType = "fire"

type FireTaskType = {
  type: TaskType,
  col: number,
  row: number
}

const boardReducer = (boardState: BoardState, task: FireTaskType) => {
  if (task.type == 'fire') {
    const key = 'cell' + (task.row*10+task.col)
    boardState = {...boardState, [key]: Status.Miss}
  }
  return boardState
}

export default boardReducer
