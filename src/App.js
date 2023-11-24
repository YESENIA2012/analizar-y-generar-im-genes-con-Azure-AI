import "./dotenv"
import React from 'react';
import { useState } from 'react';
import { analyzeImage } from "./azure-image-analysis"
import { generateImage } from "./azure-image-generation"
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [receiveInput, setReceiveInput] = useState(false)
  const [showImageAnalyse, setShowImageAnalyse] = useState("")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const displayResults = async () => {
    try {
      let result  = await analyzeImage(inputValue, setReceiveInput)
      let imageAnalyse = JSON.stringify(result, null, 2)

      if(imageAnalyse){
        setShowImageAnalyse(imageAnalyse)
      }
      
      return imageAnalyse
    } catch (error) {
      console.log("error", error)
    }
  }

  const displayResults2 = async () => {
    try {
      let result  = await generateImage(inputValue)
      let imageGeneralized = result[0].url

      if(imageGeneralized){
        setInputValue(imageGeneralized)
      }
      
      return result
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="App">
      <h1>Computer vision</h1>
      <label>
        Insert URL or type prompt:
        <input 
          type="text" 
          placeholder='Enter URL to analyze or textual prompt to generate an image'
          value={inputValue} 
          onChange={handleInputChange} 
        />
      </label>
      <br />
      <button onClick={() => {
        displayResults()
      }}>
        Analyze
      </button>
      <button onClick={() => {
        displayResults2()
      }}>Generate</button>
      <div className='analyzedData'>
      <h2>Computer Vision Analysis</h2>
      <img src={inputValue} alt='Image' />
      <pre>
        <code>
          {receiveInput ? showImageAnalyse : " "}
        </code>
      </pre>
    </div>
    </div>
  );
}

export default App;
