import React, { Component } from 'react';
import "../token.css"

class PlusToken extends Component 
{
  constructor(props)
  {
  	super(props); 
    //this.props.isPlusToken = "1"; 
    console.log("PlusToken id = ", this.props.id); 
  }
	render() 
	{
    const btt = <button className="button"  onClick={ (e) => this.props.onClick(e, 'home', 'Home') }> + </button> ; 

    return (
      <section>
        <div id="addButton">
          {btt}
        </div> 
      </section>); 
  
 	}
}

export default PlusToken;