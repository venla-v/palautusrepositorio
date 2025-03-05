import { useState } from 'react'

const StatisticsText = ({ stat, texti }) => {
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

const Statistics = (props) => {
  const avg = ((props.good-props.bad)/props.all)
  const pos = (props.good/props.all)*100
  
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <>
    <StatisticsText stat={props.good} texti='good' />
    <StatisticsText stat={props.neutral} texti='neutral' />
    <StatisticsText stat={props.bad} texti='bad' />
    <StatisticsText stat={props.all} texti='all' />
    <StatisticsText stat={avg} texti='average' />
    <StatisticsText stat={pos+'%'} texti='positive' />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
       <Button onClick={handleGoodClick} text='good' />
       <Button onClick={handleNeutralClick} text='neutral' />
       <Button onClick={handleBadClick} text='bad' />
       <h1>statistics</h1>
       <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App