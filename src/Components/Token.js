import React, { Component } from 'react';
import "../token.css"

class Token extends Component 
{
  constructor(props)
  {
  	super(props); 
    this.checkCase = this.checkCase.bind(this); 
    this.deleteToken = this.deleteToken.bind(this); 
  }

  checkCase()
  {
    return (this.props.exact||this.props.lower||this.props.upper||this.props.title||this.mixed); 
  }

  deleteToken()
  {
    console.log("Token:Enter deleteToken()"); 
    this.props.deleteToken(this); 
  }
  
	render() 
	{
    //let { plates } = this.props
    //this.state = { }; 
    var isCaseRequired; 
    //Check to make sure that tokenabrreviation is valid
    //if it's not 
    if(this.props.tokenAbbreviation !== 'P')
    {
    	isCaseRequired = <div id="tokenCase">{this.props.exact? "Xx":"Ci"}</div>; 
    }

    var tokenText; 
    if(this.props.type === "word")
    {
      tokenText = this.props.allwords.map((word, index) => (
                  <div className="tokenEachText"> {word} </div>
                  ));  
    }
    else if (this.props.type === "numbers")
    {
      tokenText = this.props.numbers.map((num, index) => (
                  <div className="tokenEachText"> {num} </div>
                  ));  

    }
   
    return (
			<div className="widget">
        <div id="tokenHeader"> {this.props.tokenAbbreviation}   <button type='button' className='closeToken' onClick={this.deleteToken} >x</button> </div>
				<div id="tokenBody">
           <div className="tokenText"> 
                {tokenText}
          </div>
           <div className="tokenFooter">{isCaseRequired}  <div id="tokenRequired">{this.props.optional? 'o': 'r'}</div> </div>
        </div>
            
      </div> ); 
  
 	}
}

export default Token;