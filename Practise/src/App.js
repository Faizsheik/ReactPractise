import logo from './logo.svg';
import './App.css';
// import CountNumbers from './CountNumbers.mjs';
// import ArithmeticOperations from './arithmetic operations.mjs';
import VoteEligibility from './EligibilityForVote';
import PhoneBook from './PhoneBook';
import PhoneBook2 from './PhoneBook2';
import Form from './Form';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <CountNumbers/>
      <ArithmeticOperations/> */}
      {/* <VoteEligibility/>
      <PhoneBook/>
      <PhoneBook2/> */}
      <VoteEligibility/>

 
     <Form/> 
     


    </div>
  );
}

export default App;
