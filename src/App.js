import React from 'react';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import Select from './components/Select.js';
import './App.css';

function App() {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]  

  const animatedComponents = makeAnimated();

  return (
    <div className="App">
      <h1>React Select</h1>
      <ReactSelect 
        options={options} 
        name="colors"
        className="basic-multi-select"
        isMulti
        defaultValue={[options[0]]}
        components={animatedComponents}
      />
      <div className='ui form'>
        <h1>Select</h1>
        <Select options={options}  />
      </div>
    </div>
  );
}

export default App;
