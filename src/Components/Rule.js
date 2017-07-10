import React, { Component } from 'react';
import Token from './Token'
import PlusToken from './PlusToken'
import "../rule.css"
import WordTokenConfig from './WordTokenConfig';

var GLOBAL_ID = 1; 
var TOKEN_BASE = 9000; 
var PTOKEN_BASE = 8000; 
var RULE_BASE = 7000; 
var GLOBAL_RULE_ID = 1; 
class Rule extends Component
{
    constructor(props)
    {
        super(props); 
        const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        this.state = {
            array:[btt], 
            isOpen: false,
            allTokenData:{},
            value: 10, 
            id:0, 
            description:"", 
            polarity: [],
            output_format:"",
            is_active: true, 
            identifier:"",
            is_in_output:true
        }
    
        //this.setState(update(this.state, {allTokens: {$push: [btt]}}));

        //var allTokens = this.state.allTokens.slice(); 
        
        //allTokens.push(btt); 
        this.handleClick = this.handleClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this); 
        this.showWordToken = this.showWordToken.bind(this); 
        this.addNewToken = this.addNewToken.bind(this); 
        this.remove = this.remove.bind(this); 
        this.createNewToken = this.createNewToken.bind(this); 
        this.getJSON = this.createJSON.bind(this); 
    }

    componentWillMount() 
    {
        const id = RULE_BASE+(++GLOBAL_RULE_ID); 
        this.setState({id: id});
        this.setState({identifier:"name"+"_"+"_"+id}); 
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

    /*
    This method will create a new token and json data for the token

    */
    createNewToken(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1
    )
    {        
        var myJSONData = this.createJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1
        )

        //Let's store the Token data in a map in the state. 
        //We store by tokenid as the key.
        var myTokenData = this.state.allTokenData; 
        myTokenData[this.state.id] = myJSONData; 
        //this.state.allTokenData[tokenid] = myJSONData; 
        this.setState({
            allTokenData: myTokenData
        });

        /*Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format ); 

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 


        const newToken = <Token id={this.state.id} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            type={type1} allwords={allwords1}  optional={optional1} 
            part_of_output={part_of_output1} followed_by_space={followed_by_space1}
            length1={length11} length2={length21} length3={length31}
            prefix={prefix1} suffix={suffix1} notinvocabulary={notinvocabulary1}
            noun={noun1} pronoun={pronoun1} punctuation={punctuation1} 
            propernoun={propernoun1} determiner={determiner1} symbol={symbol1}
            adjective={adjective1} conjunction={conjunction1} verb={verb1}
            prepost_position={prepost_position1} adverb={adverb1} particle={particle1}
            interjection={interjection1} exact={exact1} lower={lower1} 
            upper={upper1} title={title1} mixed={mixed1} />

        return newToken; 
    }

    createJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1
    )
    {

        var myCapitalization = [];
        exact1? myCapitalization.push("exact"):myCapitalization; 
        lower1? myCapitalization.push("lower"):myCapitalization; 
        upper1? myCapitalization.push("upper"):myCapitalization; 
        mixed1? myCapitalization.push("mixed"): myCapitalization;

        var mypartOfSpeech = []; 
        noun1? mypartOfSpeech.push("noun"): mypartOfSpeech;
        pronoun1? mypartOfSpeech.push("pronoun"): mypartOfSpeech;
        punctuation1? mypartOfSpeech.push("punctuation"): mypartOfSpeech;
        determiner1? mypartOfSpeech.push("determiner"): mypartOfSpeech;
        symbol1? mypartOfSpeech.push("symbol"): mypartOfSpeech;
        adjective1? mypartOfSpeech.push("adjective"): mypartOfSpeech;
        conjunction1? mypartOfSpeech.push("conjunction"): mypartOfSpeech;
        verb1? mypartOfSpeech.push("verb"): mypartOfSpeech;
        prepost_position1? mypartOfSpeech.push("pre/post-position"): mypartOfSpeech;
        adverb1? mypartOfSpeech.push("adverb"): mypartOfSpeech;
        particle1? mypartOfSpeech.push("particle"): mypartOfSpeech;
        interjection1? mypartOfSpeech.push("interjection"): mypartOfSpeech;

        var myLength=[]; 
        length11>0? myLength.push(length11): myLength; 
        length21>0? myLength.push(length21): myLength; 
        length31>0? myLength.push(length31): myLength;     

        var myNumbers= []; 

        var tokenData=
        {
            prefix: prefix1,
            suffix: suffix1,
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:"",
            minimum:"", 
            token: allwords1,
            numbers: myNumbers,
            contain_digit: "",
            is_in_vocabulary: "",
            is_out_of_vocabulary: "",
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1
        }; 

        return tokenData; 
  }
    /*
    Method: Add a token to an array. 
    Arguments: 
    NewToken: a word, shape, punctionation token 
    */
    addNewToken(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1)
    {
        this.toggleModal(); 

        const newToken =     this.createNewToken(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1); 

        
        //const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        //const rToken1 = <Token id={TOKEN_BASE+(++GLOBAL_ID)} clickable="0" tokenAbbreviation="W" tokenText={["Hello","hi"]} tokenOptionalOrRequired="r" tokenIsCaseRequired=""/>
        

        //var test = newToken.getJSON(); 
        //alert("JSON : " + test); 

        this.setState(prevState => 
        ({
            array: [...prevState.array, newToken,btt]
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
                
                    <WordTokenConfig show={this.state.isOpen}
                        onAddNewToken={this.addNewToken}>
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