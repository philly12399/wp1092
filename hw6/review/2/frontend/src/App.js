import logo from "./logo.svg";
import react, { useState } from 'react';
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeSubject = (e) => {
    setSubject(e.target.value)
  }

  const handleChangeScore = (e) => {
    setScore(e.target.value)
  }

  const addData = () => {
    const newData = {name, subject, score};

    setData([...data, newData]);
    setName('');
    setSubject('');
    setScore('');
  }



  return (
    <div className="App">
      <div>
        <div className="inner"><h1>ScoreCard DB</h1></div>
        <div className="inner"><button className="Clear" onclick={clearData}>Clear</button></div>
      </div>
      <div>
        <input className="Name" placeholder="Name" onChange={handleChangeName} value={name}></input>
        <input className="Subject" placeholder="Subject" onChange={handleChangeSubject} value={subject}></input>
        <input className="Score" placeholder="Score" onChange={handleChangeScore} value = {score}></input>
        <button className="Add" onClick={addData}>Add</button>
      </div>
      <div>
        <div className="inner"><input type="radio" className="radio-name" name="radiobutton"></input></div>
        <label className="inner">Name</label>
        <div className="inner"><input type="radio" className="radio-subject" name="radiobutton"></input></div>
        <label className="inner">Subject</label>
        <input className="QueryInput" placeholder="Query string..."></input>
        <button className="Query-btn">Query</button>
      </div>
      <div>
        <ul>
          {data.map((data, i) =>
            <li key={i}>
              <h3>{`Adding (${data.name}, ${data.subject}, ${data.score})`}</h3>
            </li>
          )}
        </ul>
        number: {data.length}
      </div>
    </div>
  );
}

export default App;
