import React, { Component } from 'react';
import "../token.css"

class TokenWrapper extends Component 
{
    constructor(props)
    {
        super(props); 
        //this.deleteToken = this.deleteToken.bind(this); 
        this.clickClose = this.clickClose.bind(this); 
        this.clickEdit = this.clickEdit.bind(this); 
    }

    clickClose()
    {
        console.log("TokenWrapper: clickClose"); 
        this.props.onDeleteToken(this.props.index);
    }

    clickEdit()
    {
        console.log("TokenWrapper: clickEdit"); 
        this.props.onEditToken(this.props.index); 
    }

    clickPlusToken()
    {
        //this.props.
    }

    render() 
	{   
        var tokenDisplayed; 
        if(this.props.index !== 0 && (this.props.index%2) !== 0)
        {
            tokenDisplayed = <div className="tokenHeader2" >  <div className="overlayEdit" onClick={this.clickEdit}> </div>
                            <div className="overlayClose" onClick={this.clickClose}> </div>
                                {this.props.data} 

                            </div>
                                ;
        }
        else
        {
            tokenDisplayed = <div className="wrapPlusToken" >
                                {this.props.data} 
                            </div>
        }                         

        return (
			<div>
                  
                    {tokenDisplayed}
                
            </div>
       )
  
    }
}




export default TokenWrapper;

