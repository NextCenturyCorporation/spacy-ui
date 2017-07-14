import React, { Component } from 'react';
import "../token.css"

class Token extends Component 
{
  constructor(props)
  {
    super(props); 
    this.deleteToken = this.deleteToken.bind(this); 
    this.generateTokenCase = this.generateTokenCase.bind(this); 
  }

  generateTokenCase()
  {
    var tokenCase =""; 
    var ret; 
    tokenCase = this.props.exact? tokenCase + 'e.': tokenCase; 
    tokenCase = this.props.lower? tokenCase + 'l.': tokenCase; 
    tokenCase = this.props.upper? tokenCase + 'u.': tokenCase; 
    tokenCase = this.props.title? tokenCase + 't.': tokenCase; 
    tokenCase = this.props.mixed? tokenCase + 'm.': tokenCase;     

    return tokenCase; 
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
    /*
    if(this.props.tokenAbbreviation !== 'P' && 
       this.props.tokenAbbreviation !== 'N')
    {
    	isCaseRequired = <div id="tokenCase"> {this.generateTokenCase()}</div>; 
    }
    */

    var tokenText; 
    if(this.props.type === "word")
    {
      tokenText = this.props.allwords.map((word, index) => (
                  <div className="tokenEachText"> {word} </div>
                  ));  
      isCaseRequired = <div id="tokenCase">{this.generateTokenCase()}</div>; 
    }
    else if (this.props.type === "numbers")
    {
      tokenText = this.props.numbers.map((num, index) => (
                  <div className="tokenEachText"> {num} </div>
                  ));  
    }

    const divStyle =  this.props.part_of_output? 
                          {border: '2px solid orange'}: {border: 'none'};    
    return (
			<div className="widget" style={divStyle} >
        <div className="tokenHeader"> {this.props.tokenAbbreviation}   <button type='button' className='closeToken' onClick={this.deleteToken} >x</button> </div>
				<div className="tokenBody">
           <div className="tokenText"> 
                {tokenText}
          </div>
           <div className="tokenFooter">{isCaseRequired}  <div className="tokenRequired">{this.props.optional? 'o': 'r'}</div> </div>
        </div>
            
      </div> ); 
  
 	}
}

export default Token;