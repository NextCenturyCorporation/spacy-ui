import React, { Component } from 'react';
import "../token.css"

class Token extends Component 
{
  constructor(props)
  {
  	super(props); 
    //this.props.tokenAbbreviation="W"; 
    //this.props.tokenText =  ["Hello", "Hi"];
    //this.props.tokenOptionalOrRequired = "r"; 
    //this.props.tokenIsCaseRequired = "Xx";  
    this.checkCase = this.checkCase.bind(this); 
  }

  checkCase()
  {
    return (this.props.exact||this.props.lower||this.props.upper||this.props.title||this.mixed); 
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
   
    return (
			<div className="widget">
        <div id="tokenHeader"> {this.props.tokenAbbreviation}   <button type='button' className='closeToken' >x</button> </div>
				<div id="tokenBody">
           <div className="tokenText"> 
              {this.props.allwords.map((word, index) => (
                  <div className="tokenEachText"> {word} </div>
              ))}           
          </div>
           <div className="tokenFooter">{isCaseRequired}  <div id="tokenRequired">{this.props.optional? 'o': 'r'}</div> </div>
        </div>
            
      </div> ); 
  
 	}
}

export default Token;