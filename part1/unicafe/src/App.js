import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  const AverageFeedback = () => {
  
    if (props.total > 0) {
      return (props.good - props.bad)/props.total
    } else {
      return 0
    }
  }

  const PositivePercentage = () => {
    if (props.total > 0) {
      return (props.good/props.total)*100
    } else {
      return 0
    }
  }

  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={props.good} />
            <StatisticLine text='neutral' value={props.neutral} />
            <StatisticLine text='bad' value={props.bad} />
            <StatisticLine text='all' value={props.total} />
            <StatisticLine text='average' value={AverageFeedback()} />
            <StatisticLine text='positive' value={`${PositivePercentage()} %`} />
          </tbody>
        </table>
      </div>
    )
  }

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const incrGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const incrNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  
  const incrBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const Feedback = () => {

    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => incrGood()} text='good' />
        <Button handleClick={() => incrNeutral()} text='neutral' />
        <Button handleClick={() => incrBad()} text='bad' />
      </div>
    )
  }
  
  return (
    <div>
      <Feedback />
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  );
}

export default App;
