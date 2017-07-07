import React, { Component } from 'react';
import Rule from './Components/Rule'; 
import "./layout.css"

import WordTokenConfig from './Components/WordTokenConfig'


class App extends Component {
  constructor(props) 
  {
    super(props);

    var react = require('react'); 
    //alert("React version" + react); 
    /*this.props.rulesText = "This is test Text. \n" +
    											  "The user can type in whatever they want and select the rules to test. The results show below." +
      											"Hi My Name is Sara and I live in Los Angeles"; 
    	*/							
  }
  
  render() {
    
    return (
      <div className="App">
      
      <div className="page-wrap">
        <div id="appHeader">
          
          <div className="run-rules"> <button className="button">Run Rules </button> </div>
        </div> 
        <span className="extractionText"> Extraction Rules </span>
        <div className="extraction-rules">
        <div id="ruleMenu">
        <button className="button">Add Rule </button>  <button className="button">Select All </button> <button className="button"> Deselect All</button> <button className="button"> Delete</button> <button className="button"> Duplicate</button> 
          </div> 
          <div>{<Rule rulenum="1"/> } </div> 
          
          </div>
        <br/>
        <span className="ExtractionText"> Text</span>
       
        <div className="rulesText"> <textarea name="Text1"  rows="5" className="textInput"></textarea> </div> 
        <br/>
        <span className="ExtractionText"> Results</span>
        
    	</div>
      
      </div>
    );
    
  }
  
}

export default App;
