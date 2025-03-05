import { useState } from 'react'

const StatisticLine = ({ value, texti }) => {
  return (
    <tr>
      <td>{texti} {value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
     {text}
    </button>
  )
}

const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral
  const avg = ((props.good-props.bad)/all).toFixed(1)
  const pos = ((props.good/all)*100).toFixed(1)
  
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
    <tbody>
      <StatisticLine value={props.good} texti='good' />
      <StatisticLine value={props.neutral} texti='neutral' />
      <StatisticLine value={props.bad} texti='bad' />
      <StatisticLine value={props.all} texti='all' />
      <StatisticLine value={avg} texti='average' />
      <StatisticLine value={pos + '%'} texti='positive' />
    </tbody>
  </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral+1)} text='neutral'/>
      <Button handleClick={() => setBad(bad+1)} text='bad'/>
       <h1>statistics</h1>
       <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    
  )
}

export default App