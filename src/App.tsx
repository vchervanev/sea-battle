import React from 'react'
import logo from './logo.svg'
import './App.css'
import Board from './Board'
import { RandomBattle } from './battle'

function App() {
  const b1 = new RandomBattle()
  const b2 = new RandomBattle()

  return (
    <div className="App">
      <header className="App-header">
        <Board battle={b1} />
        <Board battle={b2} />
      </header>
    </div>
  )
}

export default App
