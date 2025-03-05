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

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    
    setGood(good + 1)
    setAll(all + 1)
    countAverage(good+1, neutral, bad)
    countPositive(good+1, neutral, bad)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    countAverage(good, neutral +1, bad)
    countPositive(good, neutral+1, bad)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    countAverage(good, neutral, bad+1)
    countPositive(good, neutral, bad+1)
  }

  const countAverage = (good, neutral, bad) => {
    const sum = good + bad + neutral
    const avg = (good - bad) / sum
    setAverage(avg)
  }

  const countPositive = (good, neutral, bad) => {
    const sum = good + bad + neutral
    const pos = good / sum
    setPositive(pos*100 + '%')
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
       <Statistics stat={all} texti='all' />
       <Statistics stat={average} texti='average' />
       <Statistics stat={positive} texti='positive' />
    </div>
  )
}

export default App