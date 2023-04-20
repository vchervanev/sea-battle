import React from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './Board'
import { RandomBattle } from './battle'

function App() {
  const b1 = new RandomBattle()
  const b2 = new RandomBattle()

  return (
    <div className="game-board">
      <Board battle={b1} />
      <Board battle={b2} />
    </div>
  )
}

export default App
