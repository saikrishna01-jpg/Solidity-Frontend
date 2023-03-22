import './App.css';
import React, {useState, useEffect } from "react";
import Web3 from "web3"
import contractAbi from "./Contract.json"

function App() {
  const [value, setValue] = useState(0);
  const [storedValue, setStoredValue] = useState(0);
  
  const web3 = new Web3("http://localhost:7545")

  const address = '0xEfec28b6A2Ef58e4d4F9b29937382c78e5f980ed';
  const myContract = new web3.eth.Contract(contractAbi, address)

  async function handleSubmit(event) {
    event.preventDefault()
    await myContract.methods.setValue(value).send(
      { from: '0x3a48FA9A4d1448b2f210C9Dc1Bf38a688A20Eb86'}
    );
    const val = await myContract.methods.getValue().call();
    setStoredValue(val)

  }

  return (
    <div>
      <h1>SimpleContract Example</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Value:
          <input type="number" value={value} onChange={(event) => setValue(event.target.value)} />
        </label>
        <button type="submit">Set Value</button>
      </form>
      <div>
        Stored Value: <span>{storedValue} </span> 
      </div>
    </div>
  );
}

export default App;
