import React, { Component } from 'react';
import Token from './Token'
import PlusToken from './PlusToken'
import "../rule.css"
import WordTokenConfig from './WordTokenConfig';

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
            array:[btt], 
            isOpen: false
        }
    
        //this.setState(update(this.state, {allTokens: {$push: [btt]}}));

        //var allTokens = this.state.allTokens.slice(); 
        
        //allTokens.push(btt); 
        this.handleClick = this.handleClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this); 
        this.showWordToken = this.showWordToken.bind(this); 
        this.addNewToken = this.addNewToken.bind(this); 
        this.remove = this.remove.bind(this); 

        this.state.value =  10; 
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

  

        /*
        const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        const rToken1 = <Token id={TOKEN_BASE+(++GLOBAL_ID)} clickable="0" tokenAbbreviation="P" tokenText={[")",","]} tokenOptionalOrRequired="r" tokenIsCaseRequired=""/>
        
        this.setState(prevState => 
        ({
            array: [...prevState.array, rToken1,btt]


        }));
        
        */
        
        //alert("HandleClick"); 
    
        var x = document.getElementById('tokenMenu');
        if (x.style.display === 'none') 
        {
            /*x.style.visibility = 'visible'; */
            x.style.display = 'block';
        } else 
        {
            x.style.display = 'none';
            /*x.style.visibility = 'hidden'; */
        }
    
    }

 

    handleChange()
    {
        alert()

    }

    toggleModal()
    {
        //alert("toggleModal"); 
        
        this.setState({
         isOpen: !this.state.isOpen
        });
        
    }

    remove()
    {


    }

    addNewToken()
    {
        this.toggleModal(); 
        
        //const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        const rToken1 = <Token id={TOKEN_BASE+(++GLOBAL_ID)} clickable="0" tokenAbbreviation="W" tokenText={["Hello","hi"]} tokenOptionalOrRequired="r" tokenIsCaseRequired=""/>
        
        this.setState(prevState => 
        ({
            array: [...prevState.array, rToken1,btt]


        }));

    }  


    showWordToken()
    {
        /*lets close the menu*/
        var x = document.getElementById('tokenMenu');
        x.style.display = 'none';

        this.toggleModal();
        /*
        this.setState({
         isOpen: !this.state.isOpen
        });
        */
        
    }

    checkToken(token )
    {
        //alert(token); 
        if(token.props.clickable === "1")
        {
            //alert("This is plustoken"); 
            return   <select value={this.state.value} onChange={this.handleChange} name="tokentype" id='ttype' >
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>; 
        }
        
        return ""; 
    }


    render() 
	{
        return (
            <section>
                <div className="rulewrapper">

                    {/*}
                    <WordTokenConfig show={this.state.isOpen}
                    onClose={this.addNewToken}>
                    </WordTokenConfig>
                    */} 
                    <WordTokenConfig show={true}
                        onClose={this.addNewToken}>
                    </WordTokenConfig>

                    <div className="ruleHeader">
                        <label htmlFor={this.props.name}> {this.props.rulenum}.  </label>
                        <input
                        placeholder= "Enter rule description "
                        type="text"
                        className="ruleDescription"
                        value={this.props.value}
                        onChange={this.props.handleChange}
                        />
                    </div>

                    
                    {/* Let arrange the token with the + signs inbetween. */}
                    <div id="container">
                        <div id="tokenMenu" >
                            <div onClick={this.showWordToken}> word </div>
                            <div> number </div> 
                            <div> shape </div>
                            <div> punctuation </div>
                        </div>   

                        <div id="arrangeRuleTokens"> 


                            <input type="checkbox" name="rule" value="word" className="ruleCheckBox" /> 

                            {this.state.array.map((token, index) => (
                                /*<div clasName="arrangeEachToken"> */
                                <div className="arrangeEachToken">  {token}   </div>
                                /*}
                                {this.checkToken(token)} 
                                </div> */
                            ))}  

                        </div>

                    </div> 

        
                    <div id="ruleOutput"> Output format: </div> 
                    
                </div>
            </section>    
    );   
  }
}


export default Rule;