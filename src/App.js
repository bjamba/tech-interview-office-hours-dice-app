import './App.css';

/**
 * Roadmap
 * =======
 * 
 *  Services (none)
 *  Infra (none)
 * 
 *  Objects
 *   Die - used to display value of roll
 *   Log - used to store history of past rolls
 *   Selector - used to select sides for each die
 *   Button - used to add die, remove die, roll dice, selects sides for die
 * 
 *  Functions
 *   addDie - Adds a new die to state with the requisite sides
 *   removeDie - Removes the specific die from the existing dice
 *   rollDie - Rolls all the existing dice together
 *    calculateTotal - Calculate total for all dice; dependent on rollDie
 *    updateLog - Update log with state information + total; dependent on rollDie
 */

function App() {
  return (
    <div className="App">
      Hello world!
    </div>
  );
}

export default App;
