
import React, { Component } from 'react';
import Rule from './Components/Rule'; 
import "./layout.css"; 

/*We need base.64 for the authentication*/
const base64 = require('base-64');
var webServiceUrl = ""; 
var webServiceUrlAllRules = ""

var RULE_NUM = 0; 


window.CREATEDBY_SERVER = "server"; 
window.CREATEDBY_USER = "user"; 
window.TYPE_WORD = "word"; 
window.TYPE_NUMBERS = "number"; 
window.TYPE_PUNCTUATION = "punctuation"; 
window.TYPE_SHAPE = "shape"
/*
  Main Application entry point
*/
class App extends Component {
  constructor(props) 
  {
    super(props);

    /*Set necessary state*/
    this.state = 
    {
      jsonReturnedValue: null, 
      allRuleData:{}, 
      test_text:"",
      jsonresults:{},
      jsonRules:[], 
      jsonExtraction:[],
      ruleList:[],
      allServerRules:{rules:[]},
      createdby:window.CREATEDBY_SERVER
    }

    /*function binding required by react*/
    this.sendData = this.sendData.bind(this);
    this.ProcessJSONData = this.ProcessJSONData.bind(this); 
    this.buildData2Send = this.buildData2Send.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleChange = this.handleChange.bind(this);
    this.addNewRule = this.addNewRule.bind(this); 
    this.getData = this.getData.bind(this); 
    this.addRuleFromServer = this.addRuleFromServer.bind(this); 
    this.processRulesData = this.processRulesData.bind(this); 
    this.getInitialState = this.getInitialState.bind(this); 
    this.selectAll = this.selectAll.bind(this); 
    this.deselectAll = this.deselectAll.bind(this); 
  }

  componentWillMount() 
  {
    //    'http://52.36.12.77:9879/projects/pedro_test_01/fields/name/spacy_rules'

    if(this.props.params.projectName === undefined || this.props.params.fieldName === undefined)
    {
      console.log("No project/field name specified. ")
    }


    webServiceUrl = 'http://52.36.12.77:9879/projects/' + this.props.params.projectName + '/fields/'+
                 this.props.params.fieldName + '/spacy_rules'; 
    webServiceUrlAllRules = webServiceUrl + "?type=all";


    console.log("webservice url = " + webServiceUrl); 
    console.log("Address for getting rules:" +webServiceUrlAllRules); 

    this.getData(); 

    /*
    const initialRule = <Rule rulenum={++RULE_NUM}  onProcessJSONData={this.ProcessJSONData}/> ; 

    this.setState(prevState =>
    ({
        ruleList: [...prevState.ruleList, initialRule]
    }));
    */

  }

  /*
    Method for form submittal. 
  */
  handleSubmit(event) 
  {
    event.preventDefault();
  }

  /*
    Method to update the form when the test_text changes. 
  */
  handleChange(event) 
  {
    this.setState({test_text: event.target.value});
  }

  /*
    The method is a callback method that called by rules.js whenver a new token is created. 
  */
  ProcessJSONData(ruleid, allTokenData, identifier1, description1, polarity1,is_active1,output_format1, createdby)
  {
    
    console.log("ProcessJSONData....ruleid="+ruleid ); 
    //This allows us to make a copy. 
    var myPattern = JSON.parse(JSON.stringify(allTokenData));
    
    for(var i=0; i< myPattern.length ;  i++)
    {
      myPattern[i].is_followed_by_space = myPattern[i].is_followed_by_space.toString(); 
      myPattern[i].is_required = myPattern[i].is_required.toString(); 
      myPattern[i].is_in_output = myPattern[i].is_in_output.toString(); 
    }
    


    /*We need the raw date from allTokenData - we need to remove the token ids since it's not necessary 
    when we send the JSON file across the wire. So Object.values allows us to just grab the values from the 
    map allTokenData */

    /*Let's build each rule token according to the JSON spec */
    
    const result = Object.values(allTokenData);


    var myRuleData = this.state.allRuleData; 
    myRuleData[ruleid] = {
        polarity: polarity1, 
        description: description1, 
        pattern: myPattern,
        output_format: output_format1,
        is_active: is_active1? "true":"false", //requires a string for true or false. 
        identifier: identifier1
    } 

    /*update the state data - kind of a way to persist the data */

    this.setState({
      allRuleData: myRuleData
    });

    //console.log("Data 2 send  ="+ this.buildData2Send()); 
    if(createdby == window.CREATEDBY_USER)
    {
      this.sendData(); 
    }
  }

  processRulesData(rule, index)
  {
    var myRule= this.getInitialState(); 
    //this.state.allServerRules.rules.push(myRule); 
    let allRules = this.state.allServerRules.rules; 
    allRules[index] = rule; 

    this.setState(prevState =>
    ({
        allServerRules: {rules:allRules}
    }));
  }

  getInitialState()
  {
    return {
      identifier: "",
      description: "",
      is_active: "true",
      output_format:"",
      pattern:[]
    }
  }

  /*
  This method is used to build the JSON data that will be transmitted. 
  */
  buildData2Send()
  {

    //TODO: @wole change the rule data to send. 
    const values = Object.values(this.state.allRuleData); 
    var myData2Send = {};
    myData2Send={
      rules: values, 
      test_text:this.state.test_text
    }; 

    return JSON.stringify(myData2Send);     
  }

  getData()
  {
    console.log("getData  from webservice=" +webServiceUrlAllRules);

    //This is how you authenticate using base64(username:password. )
    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode("memex:digdig"));
    headers.append("accept", "application/json"); 
    /*
    Let's fetch the data from the webservice. 
    */
    //alert(webServiceUrl); 
    fetch(webServiceUrlAllRules, {
      method: 'GET',  
      headers: headers, //authentication header. 
    }).then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        //alert("GETDATA WoRKED"); 
                        if(json === undefined)
                          return; 

                        /*If there is an error, then there is no json.rules - it's undefined. 
                        *
                        */
                        if(json.rules !=undefined)
                        {
                          console.log("Received 200 ok"); 
                          if(json.rules.length < 1 )
                          {
                            console.log("There are NO rules from this project/field combination");
                            return; 
                          }

                          console.log("Received data contains " + json.rules.length + " rules"); 
                          console.log("Results = "  + json.test_text); 
                          //this.state.createdby = window.CREATEDBY_SERVER; 
                          
                    
                          this.setState({
                            createdby: window.CREATEDBY_SERVER,
                            allServerRules: json,
                            test_text: json.test_text
                          });
/*
                        this.state.allServerRules.rules.map((rule,index)=>(
                            this.addRuleFromServer(rule, index)
                        )); 
*/

                        }
                        else
                        {
                          console.log("Error code " + json.status_code + "received"); 
                          console.log("Error msg = " + json.error_message); 
                        }
                    });
  }

  /*
  This method sends the JSON data across the wire and processes the response. 
  */
  sendData()
  {
    console.log("Enter SendData: about post json to the SERVER");

    //This is how you authenticate using base64(username:password. )
    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode("memex:digdig"));

    /*
    Let's fetch the data from the webservice. 
    */
    console.log(webServiceUrl); 
    fetch(webServiceUrl, {
      method: 'POST',  
      headers: headers, //authentication header. 
      body:
          this.buildData2Send() //JSON data created earlier. 
    }).then( (response) => {
                return response.json() })   
                    .then( (json) => {

                        if(json === undefined)
                          return; 
                        
                        //var myArr = JSON.parse(json);
                        console.log("Test = " + json.results); 
                        var myResultRules=[]; 
                        var myResultExtractions=[]; 
                        for(var i=0; i < json.results.length; i++)
                        {
                          console.log("result rule_id =" +  json.results[i].context.rule_id +" value="+json.results[i].value); 
                          //myResult[json.results[i].context.rule_id] = json.results[i].value; 
                          myResultRules.push(json.results[i].context.rule_id); 
                          myResultExtractions.push(json.results[i].value); 
                        }
                        this.setState({
                          jsonRules: myResultRules,
                          jsonExtraction: myResultExtractions
                        });
                    });
  }

  /*
    This method is for adding new rule to the rule list. 
  */
  addNewRule()
  {
    /*
    const newRule = <Rule rulenum={++RULE_NUM}  onProcessJSONData={this.ProcessJSONData} createdby="user" /> ; 
    this.setState(prevState =>
    ({
        ruleList: [...prevState.ruleList, newRule]
    }));
    */
    var myRule = this.getInitialState(); 
    this.setState({
        createdby: window.CREATEDBY_USER
    }); 

    //this.state.allServerRules.rules.push(myRule); 
    let allRules = this.state.allServerRules.rules; 
    allRules.push(myRule); 
    var test = {rules:allRules}; 

    this.setState(prevState =>
    ({
        allServerRules: {rules:allRules}
    }));
    

  }

  selectAll()
  {


  }

  deselectAll()
  {

  }

  addRuleFromServer(rule, index)
  {
    const newRule = <Rule rulenum={++RULE_NUM}  onProcessJSONData={this.ProcessJSONData}  ruleObj={rule} createdby="server"/> ; 
    this.setState(prevState =>
    ({
        ruleList: [...prevState.ruleList, newRule]
    }));    
  }


  /*
    For rendering the GUI. 
  */  
  render() 
  {
    return (
      <div className="App">
      
      <div className="page-wrap">
        <div id="appHeader">
          <div id="ruleMenu">
          <button className="button" onClick={this.addNewRule} >Add Rule </button>  <button className="button" onClick={this.selectAll}>Select All </button> <button className="button" onClick={this.deselectAll}> Deselect All</button> 
          {/*<button className="button"> Delete</button> <button className="button"> Duplicate</button> */}
          </div> 
          
        </div> 
        <span className="extractionText"> Extraction Rules </span>
        <div className="extraction-rules">

          <div>
            {/*<Rule rulenum="1"  onProcessJSONData={this.ProcessJSONData}/> */}
              <ul className="listStyle">

                {/*this.state.ruleList.map((rule, index) => (
                  <li>{rule} </li>
                ))*/}    
                {this.state.allServerRules.rules.map((rule,index)=>(
                   // <Rule rulenum={index+1}  index = {index} onProcessJSONData={this.ProcessJSONData} ruleObj={rule}/>
                    <Rule rulenum={index+1} index = {index} key={index} onProcessJSONData={this.ProcessJSONData}  ruleObj={rule} createdby={this.state.createdby}/> 

                ))}

              </ul>

          </div> 
          
          </div>
        <br/>
        <form onSubmit={this.handleSubmit}> 
          <span className="extractionText"> Text</span>
          <div className="rulesText"> <textarea name="test_text" onChange={this.handleChange}  rows="5" className="textInput" value={this.state.test_text}/> </div> 
        </form>
        <br/>
       <div id="run-rules"> <button className="button" onClick={this.sendData} >Run Rules </button> </div>

        <span className="extractionText"> Results </span>
        <div id="result">
          <ul className="listStyle">
            {this.state.jsonRules.map((ruleid, index) => (
               <li> <span className="resultwrap"> Rule: <b>{ruleid+1}</b> </span>  Extraction: <b>{this.state.jsonExtraction[index]}</b>  </li>
            ))}             
          </ul>
       </div>
            
    	</div>

      
      </div>
    );
    
  }
  
}


export default App;
