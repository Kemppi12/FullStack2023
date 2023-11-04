import { useState } from 'react'


/*const Statistics = ({good , neutral , bad , total}) => {

  if (total === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No feedback given!
      </div>
    )
  }

  const average = ( good * 1 + neutral * 0 + bad * -1) / total;
  const positive = ( good / total * 100)

  return (
    <div>
      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {total}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    //setAll(allClicks.concat('L'))
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    //setAll(allClicks.concat('L'))
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }

  const handleBadClick = () => {
    //setAll(allClicks.concat('L'))
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>  
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App;
*/


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])

  const selectRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const userVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const largestValue = Math.max(...votes);
  const mostVotedAnecdote = votes.indexOf(largestValue);

  
  return (
    <div>
      <h1>Software Engineering Anecdotes</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes} votes</p>
      <button onClick={userVotes}>Vote</button>
      <button onClick={selectRandomAnecdote}>Next Anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotedAnecdote]}</p>
    </div>
  );
}

export default App