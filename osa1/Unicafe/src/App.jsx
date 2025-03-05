import { useState } from 'react'

const Statistics = ({ stat, texti }) => {
  return (
    <div>
      <p>{texti} {stat}</p>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
       <Button onClick={handleGoodClick} text='good' />
       <Button onClick={handleNeutralClick} text='neutral' />
       <Button onClick={handleBadClick} text='bad' />
       <h1>statistics</h1>
       <Statistics stat={good} texti='good' />
       <Statistics stat={neutral} texti='neutral' />
       <Statistics stat={bad} texti='bad' />
    </div>
  )
}

export default App