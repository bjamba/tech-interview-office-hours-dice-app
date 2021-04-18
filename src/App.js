import React, { useState } from 'react';
import './App.css';
import d6 from './img/d6.jpg';
import d8 from './img/d8.jpg';
import d10 from './img/d10.jpg';
import d12 from './img/d12.jpg';
import d20 from './img/d20.jpg';
import ReactDOM from 'react-dom';


/**
 * Roadmap
 * =======
 * 
 *  Services (none)
 *  Infra (none)
 * 
 *  Objects
 *   Die - used to display value of roll
 *   Selector - used to select sides for each die
 *   Button - used to add die, remove die, roll dice, selects sides for die
 *   Log - used to store history of past rolls
 */

function Die(props) {
  const images = {
    d6, d8, d10, d12, d20
  };

  console.log(props.animation);
  return (
    <div className="die">
      <img
        className="die-img"
        onAnimationEnd={() => props.setAnimation(0)}
        animation={props.animation}
        height={"50"} width={"50"}
        src={images[`d${props.die.sides}`]}
        alt={`d${props.die.value}`}
      />
      <div>{props.die.value}</div>
    </div>
  );

}

function DieSidesSelector(props) {
  const [newDie, setNewDie] = useState(props.sides[0]);

  return (
    <div>
      <label>Select number of sides: </label>
      <select id="die-side-selector" selected value={newDie} onChange={e => setNewDie(e.currentTarget.value)}>
        {props.sides.map((e) => {
          return <option key={e} value={e}>{e}</option>;
        })}
      </select>
      <Button onClick={() => props.onClick(newDie)} buttonText={"Add"}/>
    </div>
  );
}

function Button(props) {
  return (
    <button className="button" onClick={() => props.onClick()}>{props.buttonText}</button>
  );
}

function Log(props) {
  return (
    <div>
      <ul>
        {props.log.map((logItem, i) => {
          const dice = logItem.dice.map(e => `[${e.value}]`).join(', ')
          return <li key={i+1}>{`Roll #: ${i+1}  | Total: ${logItem.total} | Dice: ${dice}`}</li>;
        })}
      </ul>
    </div>
  )
}

export default function App() {
  const [dice, setDice] = useState([]);
  const [log, setLog] = useState([]);
  const [animation, setAnimation] = useState(0);

/**
 *  Functions
 *   addDie - Adds a new die to state with the requisite sides
 *   removeDie - Removes the specific die from the existing dice
 *   rollDie - Rolls all the existing dice together
 *    calculateTotal - Calculate total for all dice; dependent on rollDie
 *    updateLog - Update log with state information + total; dependent on rollDie
 */
  const addDie = (newDie) => {
    setDice(dice.concat({ sides: newDie, value: newDie }))
  }

  const removeDie = (idx) => {;
    setDice(dice.filter((v,i) => i !== idx));
  }

  const rollDice = () => {
    const rolledDice = dice.map((die) => {
      const newDie = {
        sides: die.sides,
        value: Math.ceil(Math.random()*die.sides),
      }
      return newDie;
    });

    setAnimation(1);
    setDice(rolledDice);
    updateLog(rolledDice);
  };

  const rerollDie = (i) => {
    const rolledDice = dice.map((die, idx) => {
      if (i === idx) {
        return { sides: die.sides, value: Math.ceil(Math.random()*die.sides) };
      }
      return die;
    });

    setDice(rolledDice);
    updateLog(rolledDice);
  };

  const updateLog = (dice) => {
    if (dice.length > 0) {
      setLog(log.concat({ dice, total: dice.reduce((a,c) => a + parseInt(c.value), 0)}));
    }
  }

  const resetState = () => {
    setDice([]);
    setLog([]);
  };

  return (
      <div className='App'>
        Roll some dice!
        <br />
        <br />
        <DieSidesSelector onClick={(newDie) => addDie(newDie)} sides={[6,8,10,12,20]} />
        <br />
        <Button buttonText={"Roll All!"} onClick={() => rollDice()} />
        <Button buttonText={"Reset"} onClick={() => resetState()} />
        <br />
        <br />
        {dice.map((v,i) => {
          return (
            <div key={i}>
              <Die die={v} animation={animation} setAnimation={(i) => setAnimation(i)}/>
              <Button buttonText={"Roll"} onClick={() => rerollDie(i)} />
              <br />
              <Button buttonText={"Remove"} onClick={() => removeDie(i)} />
            </div>
          );
        })}
        <Log log={log} />
    </div>
    );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
