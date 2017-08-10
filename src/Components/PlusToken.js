import React, { Component } from 'react';
import "../Styles/token.css"

class PlusToken extends Component 
{
	render() 
	{
    //You have to set the this.props.onclick here so that you can add event handler to any
    //other components that declars PlusToken with an onClick Handler. 
    const btt = <button className="button"> + </button> ; 

    return (
      <section>
        <div id="addButton">
          {btt}

        </div> 
      </section>); 
  
 	}
}


export default PlusToken;