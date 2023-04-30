import './Board.css'
import React, { ReactNode, useReducer, useState } from 'react'
import { Battle } from './battle'
import boardReducer from './boardReducer'
import * as cell from './Cell'

export interface BoardState {
  [key: string]: cell.Status
}

const defaultState = () => {
  const board: BoardState = {}
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      board['cell' + (row * 10 + col)] = cell.Status.Unknown
    }
  }
  return board
}

const generate = (count: number, generator: (i: number) => ReactNode) => {
  let i = 0
  return Array(count)
    .fill(null)
    .map(() => {
      const tmp = i
      i++
      return generator(tmp)
    })
}

type BoardProps = {
  battle: Battle
}

const Board = (props: BoardProps) => {
  const [board, dispatch] = useReducer(boardReducer, defaultState())

  const status = (row: number, col: number): cell.Status =>
    board['cell' + (row * 10 + col)]

  const onClick = (row: number, col: number) => {
    dispatch({ type: 'fire', battle: props.battle, row, col })
  }

  return (
    <table className="board">
      <tbody>
        {generate(10, (row) => (
          <tr key={row}>
            {generate(10, (col) => (
              <cell.Cell
                key={row * 10 + col}
                onClick={onClick}
                row={row}
                col={col}
                status={status(row, col)}
              />
            ))}
          </tr>
        ))}
        <tr>
          <td colSpan={10}>{Array(props.battle.hp()).fill('❤️').join(' ')}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Board
