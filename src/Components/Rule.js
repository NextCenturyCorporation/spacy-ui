import React, { Component } from 'react';
import Token from './Token'
import PlusToken from './PlusToken'
import "../rule.css"

var GLOBAL_ID = 1; 
var TOKEN_BASE = 9000; 
var PTOKEN_BASE = 8000; 
class Rule extends Component
{
    


    constructor(props)
    {
        super(props); 
        //this.props.rulenum = "2"; 

        //const btt = <div className="arrangeEachToekn" onClick={this.handleClick.bind(this)}> <PlusToken clickable="1" /> </div>;
        //const btt = <div className="arrangeEachToekn"> <PlusToken  id={++GLOBAL_ID}  clickable="1" onClick={this.handleClick.bind(this)}/> </div>;

        const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        this.state = {
            array:[btt]
        }
    
         

        //this.setState(update(this.state, {allTokens: {$push: [btt]}}));

        //var allTokens = this.state.allTokens.slice(); 
        
        //allTokens.push(btt); 
        this.handleClick = this.handleClick.bind(this);
    }

  
    handleClick(e) 
    {
        //if( this.state.array[0].props.id)
        //var id = this.state.array[0].props.id; 
        //alert("I found the id = " + this.state.array[0].props.id); 
        //alert("Hello " + this.state.array[0].clickable); 
        //Note: how we bind onClick={this.handleClick.bind(this)}
        //const btt = <div className="arrangeEachToken" onClick={this.handleClick.bind(this)}> <PlusToken  id={++GLOBAL_ID} clickable="1" onClick={this.handleClick.bind(this)}/> </div>;
        //const btt = <PlusToken  id={++GLOBAL_ID} clickable="1" onClick={this.handleClick.bind(this)}/>; 
        //const rToken1 = <div className="arrangeEachToken">  <Token id={++GLOBAL_ID} tokenAbbreviation="P" tokenText={[")",","]} tokenOptionalOrRequired="r" tokenIsCaseRequired=""/> </div>; 
        const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        const rToken1 = <Token id={TOKEN_BASE+(++GLOBAL_ID)} tokenAbbreviation="P" tokenText={[")",","]} tokenOptionalOrRequired="r" tokenIsCaseRequired=""/>
        //this.state.array.push(rToken1); 

        //this.setState(update(this.state, {array: {$push: [rToken1]}}));
        
        this.setState(prevState => 
        ({
            array: [...prevState.array, rToken1,btt]
        }));
        
    }  
    render() 
	{
        //const btt = <button className="button"> + </button> ; 

        //const rToken1 = <Token tokenAbbreviation="P" tokenText={[")",","]} tokenOptionalOrRequired="r" tokenIsCaseRequired=""/>; 
        //const rToken2 = <Token tokenAbbreviation="W" tokenText={["Hello","Hi"]} tokenOptionalOrRequired="r" tokenIsCaseRequired="Ci"/>;         
         //= [btt]; 

        return (
            <section>
                <div className="rulewrapper">
                <div className="ruleHeader">
                    <label htmlFor={this.props.name}> {this.props.rulenum}. <span className="positiveNegative">++</span> </label>
                    <input
                    placeholder= "Enter rule description "
                    type="text"
                    className="ruleDescription"
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    />
                </div>
                
                {/* Let arrange the token with the + signs inbetween. 
                <div className="arrangeRuleTokens"> <input type="checkbox" name="rule" value="word" className="ruleCheckBox" /> 
                    <button className="button"> + </button> 
                    <div className="arrangeEachToken"> 
                        <Token tokenAbbreviation="P" tokenText={[")",","]} tokenOptionalOrRequired="r" tokenIsCaseRequired=""/>
                    
                    </div> 
                    <button className="button"> + </button> 
   
                                    {allToken.map((token, index) => (
                    <div className="arrangeEachToken"> {token}</div>
                    ))}  
                        {/*allToken}
                    </div>                      
                    <div className="arrangeEachToken"> 

                        }
                    <button className="button"> + </button> 
                </div> 
                */}

                {/* Let arrange the token with the + signs inbetween. */}
                <div className="arrangeRuleTokens"> <input type="checkbox" name="rule" value="word" className="ruleCheckBox" /> 

                    {this.state.array.map((token, index) => (
                        token
                    ))}  

                </div>
      
                <div id="ruleOutput"> Output format: </div> 
                
                </div>
            </section>    
    );   
  }
}


export default Rule;