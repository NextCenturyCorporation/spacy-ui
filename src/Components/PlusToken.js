import React, { Component } from 'react';
import "../token.css"

class PlusToken extends Component 
{
  constructor(props)
  {
  	super(props); 
  }
	render() 
	{
    //You have to set the this.props.onclick here so that you can add event handler to any
    //other components that declars PlusToken with an onClick Handler. 
    const btt = <button className="button"  onClick={ (e) => this.props.onClick(e) }> + </button> ; 

    return (
      <section>
        <div id="addButton">
          {btt}

        </div> 
      </section>); 
  
 	}
}


export default PlusToken;