
import React, { Component } from 'react';
import Rule from './Components/Rule'; 
import "./layout.css"

import WordTokenConfig from './Components/WordTokenConfig'

/*We need base.64 for the authentication*/
const base64 = require('base-64');
var webServiceUrl = ""; 

var RULE_NUM = 0; 
/*
  Main Application entry point
*/
class App extends Component {
  constructor(props) 
  {
    super(props);
    var react = require('react'); 

    /*Set necessary state*/
    this.state = 
    {
      jsonReturnedValue: null, 
      allRuleData:{}, 
      test_text:"",
      jsonresults:{},
      jsonRules:[], 
      jsonExtraction:[],
      ruleList:[]
    }

    /*function binding required by react*/
    this.sendData = this.sendData.bind(this);
    this.ProcessJSONData = this.ProcessJSONData.bind(this); 
    this.buildData2Send = this.buildData2Send.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);  
    this.handleChange = this.handleChange.bind(this);
    this.addNewRule = this.addNewRule.bind(this); 

  }

  componentWillMount() 
  {
    //    'http://52.36.12.77:9879/projects/pedro_test_01/fields/name/spacy_rules'
    webServiceUrl = 'http://52.36.12.77:9879/projects/' + this.props.params.projectName + '/fields/'+
                 this.props.params.fieldName + '/spacy_rules'; 
    /*
    this.state = {
        url: webServiceUrl
    }
    */
    const initialRule = <Rule rulenum={++RULE_NUM}  onProcessJSONData={this.ProcessJSONData}/> ; 
    //const initialRule2 = <Rule rulenum="2"  onProcessJSONData={this.ProcessJSONData}/> ; 

    this.setState(prevState =>
    ({
        ruleList: [...prevState.ruleList, initialRule]
    }));
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
  ProcessJSONData(ruleid, allTokenData, identifier1, description1, polarity1,is_active1,output_format1,is_in_output1)
  {
    console.log("ProcessJSONData....ruleid="+ruleid ); 
    var size = Object.keys(allTokenData).length;
    console.log("ProcessJSONData: size of the all tokens. ="+size); 
    
    /*We need the raw date from allTokenData - we need to remove the token ids since it's not necessary 
    when we send the JSON file across the wire. So Object.values allows us to just grab the values from the 
    map allTokenData */
    const result = Object.values(allTokenData);
    console.log("ProcessJSONData...token values" + result); 
    var size = result.length;
    console.log("ProcessJSONData: size of results = "+size); 
    

    /*Let's build each rule token according to the JSON spec */
    var myRuleData = this.state.allRuleData; 
    myRuleData[ruleid] = {
        polarity: polarity1, 
        description: description1, 
        pattern: result,
        output_format: output_format1,
        is_active: is_active1? "true":"false", //requires a string for true or false. 
        identifier: identifier1
    } 

    /*update the state data - kind of a way to persist the data */
    this.setState({
      allRuleData: myRuleData
    });

    console.log("Data 2 send  ="+ this.buildData2Send()); 
  }

  /*
  This method is used to build the JSON data that will be transmitted. 
  */
  buildData2Send()
  {
    const values = Object.values(this.state.allRuleData); 
    var myData2Send = {};
    myData2Send={
      rules: values, 
      test_text:this.state.test_text
    }; 

    return JSON.stringify(myData2Send);     
  }


  /*
  This method sends the JSON data across the wire and processes the response. 
  */
  sendData()
  {
    console.log("SendData");

    //This is how you authenticate using base64(username:password. )
    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode("memex:digdig"));

    /*
    Let's fetch the data from the webservice. 
    */
    alert(webServiceUrl); 
    fetch(webServiceUrl, {
      method: 'POST',  
      headers: headers, //authentication header. 
      body:
          this.buildData2Send() //JSON data created earlier. 
    }).then( (response) => {
                return response.json() })   
                    .then( (json) => {

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
    const newRule = <Rule rulenum={++RULE_NUM}  onProcessJSONData={this.ProcessJSONData}/> ; 
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
          
          <div className="run-rules"> <button className="button" onClick={this.sendData} >Run Rules </button> </div>
        </div> 
        <span className="extractionText"> Extraction Rules </span>
        <div className="extraction-rules">
        <div id="ruleMenu">
        <button className="button" onClick={this.addNewRule} >Add Rule </button>  <button className="button">Select All </button> <button className="button"> Deselect All</button> <button className="button"> Delete</button> <button className="button"> Duplicate</button> 
          </div> 
          <div>
            {/*<Rule rulenum="1"  onProcessJSONData={this.ProcessJSONData}/> */}
              <ul className="listStyle">
                {this.state.ruleList.map((rule, index) => (
                  <li>{rule} </li>
                ))}    

              </ul>

          </div> 
          
          </div>
        <br/>
        <form onSubmit={this.handleSubmit}> 
          <span className="ExtractionText"> Text</span>
          <div className="rulesText"> <textarea name="Text1" onChange={this.handleChange}  rows="5" className="textInput" value={this.state.test_text}/> </div> 
        </form>
        <br/>
        <span className="ExtractionText"> Results </span>
        <div id="result">
          <ul className="listStyle">
            {this.state.jsonRules.map((ruleid, index) => (
               <li> <span className="resultwrap"> Rule: <b>{ruleid}</b> </span>  Extraction: <b>{this.state.jsonExtraction[index]}</b>  </li>
            ))}             
          </ul>
       </div>
            
    	</div>

      
      </div>
    );
    
  }
  
}

const myJSONTest1 = 
{
  "rules": [
    {
      "polarity": [],
      "description": "my name is ...",
      "pattern": [
        {
          "prefix": "",
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "length": [],
          "maximum": "",
          "shapes": [],
          "token": [
            "my"
          ],
          "minimum": "",
          "numbers": [],
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_required": "true",
          "type": "word",
          "is_in_output": "false"
        },
        {
          "prefix": "",
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "length": [],
          "maximum": "",
          "shapes": [],
          "token": [
            "name",
            "names"
          ],
          "minimum": "",
          "numbers": [],
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_required": "true",
          "type": "word",
          "is_in_output": "true"
        }
      ],
      "output_format": "{1}",
      "is_active": "true",
      "identifier": "name_rule_01"
    }
  ],
  "test_text": "My name is"

}



const myJsonFile = 
{
  "rules": [
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "my"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "name",
            "names"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "is"
          ],
          "is_followed_by_space": "",
          "is_required": "false",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "upper"
          ],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_01",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "i"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "am"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "upper"
          ],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_02",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "name"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            ":"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "punctuation"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_03",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "it"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "is"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [
            "proper noun"
          ],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_04",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "this"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "is"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "mixed",
            "upper"
          ],
          "part_of_speech": [
            "proper noun"
          ],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_05",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "i"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "'"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "punctuation"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "m"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "mixed",
            "upper"
          ],
          "part_of_speech": [
            "proper noun"
          ],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_06",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "it"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "'"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "punctuation"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "s"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "mixed",
            "upper"
          ],
          "part_of_speech": [
            "proper noun"
          ],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_07",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [
            "title"
          ],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "(",
            "["
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "punctuation"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [
            "ddd"
          ],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "shape"
        }
      ],
      "identifier": "name_rule_08",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [
            "title",
            "upper",
            "mixed"
          ],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [
            "dddddddddd"
          ],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "shape"
        }
      ],
      "identifier": "name_rule_09",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    }
  ],
  "test_text": "Hello guy's, it's Jessica here from the #@%%% Spa. I cant say the name on here, and it is JessicaLa, and it is Cold\nHi Gentlemen, My name is Ashley . my name Monica I am the one and, My names is Alanda\nName : Sara . I am the one and, Name: JILL , Name:Jessie\nAshley (702)628-9035 XOXO . Aslll (702) 628-9035 XOXO Alppp 7026289035\nI'm Ashley I'm bored i am All, I am ALL\nthis is Ashleyb I'm bored This is Ashleya  This is AshleyC"
}

; 

export default App;
