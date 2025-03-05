import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
     {text}
    </button>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const taulukko = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(taulukko)
  const [selected, setSelected] = useState(0)
  const [suurin, setSuurin] = useState(0)

  const registerVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    
    let isoinVote = copy[0]
    let isoinIndex = 0

    for ( let i = 0; i < copy.length; i++ ) {
      if (copy[i] >= isoinVote) {
        isoinVote = copy[i]
        isoinIndex = i
      }
    }
    setSuurin(isoinIndex)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote'/>
      <Button handleClick={(registerVote)} text='vote'/>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[suurin]}</p>
      <p>has {votes[suurin]} votes</p>
    </div>
  )
}

export default App