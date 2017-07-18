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
    var myCap = this.props.tokenPatternData.capitalization; 
    tokenCase = myCap.indexOf("exact")>-1? tokenCase + 'e.': tokenCase; 
    tokenCase = myCap.indexOf("lower")>-1? tokenCase + 'l.': tokenCase; 
    tokenCase = myCap.indexOf("upper")>-1? tokenCase + 'u.': tokenCase; 
    tokenCase = myCap.indexOf("title")>-1? tokenCase + 't.': tokenCase; 
    tokenCase = myCap.indexOf("mixed")>-1? tokenCase + 'm.': tokenCase;     

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
    if(this.props.tokenPatternData.type === window.TYPE_WORD)
    {
      /*if there is no word text, keep
      the space for formatting otherwise the tokens will be misaligned. */
      if(this.props.tokenPatternData.token.length === 0)
      {
        tokenText = <div className="tokenEachText"></div>
      }
      else
      {
        tokenText = this.props.tokenPatternData.token.map((word, index) => (
                  <div className="tokenEachText"> {word}</div>
                  ));  
      }
      isCaseRequired = <div id="tokenCase">{this.generateTokenCase()}</div>; 
    }
    else if (this.props.tokenPatternData.type ===window.TYPE_NUMBERS)
    {
      /*if there is no word text, keep
      the space for formatting otherwise the tokens will be misaligned. */
      if(this.props.tokenPatternData.token.length === 0)
      {
          tokenText = <div className="tokenEachText"></div>
      }
      else
      {
          tokenText = this.props.tokenPatternData.numbers.map((num, index) => (
                  <div className="tokenEachText"> {num} </div>
                  ));  

      }
    } else if(this.props.tokenPatternData.type === window.TYPE_PUNCTUATION)
    {
      /*if there is no word text, keep
      the space for formatting otherwise the tokens will be misaligned. */
      if(this.props.tokenPatternData.token.length === 0)
      {
        tokenText = <div className="tokenEachText"></div>
      }
      else
      {
        tokenText = this.props.tokenPatternData.token.map((word, index) => (
                  <div className="tokenEachText"> {word}</div>
                  ));  
      }
    }

    const divStyle =  this.props.tokenPatternData.part_of_output? 
                          {border: '2px solid orange'}: {border: 'none'};  
    if(this.props.tokenPatternData.part_of_output)  
        alert("part of output"); 
    return (
			<div className="widget" style={divStyle} >
        <div className="tokenHeader"> {this.props.tokenAbbreviation}   <button type='button' className='closeToken' onClick={this.deleteToken} >x</button> </div>
				<div className="tokenBody">
           <div className="tokenText"> 
                {tokenText}
          </div>
           <div className="tokenFooter">{isCaseRequired}  <div className="tokenRequired">{this.props.tokenPatternData.optional? 'o': 'r'}</div> </div>
        </div>
            
      </div> ); 
  
 	}
}

export default Token;