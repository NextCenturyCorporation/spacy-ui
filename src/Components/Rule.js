import React, { Component } from 'react';
import Token from './Token'
import PlusToken from './PlusToken'
import "../rule.css"
import WordTokenConfig from './WordTokenConfig';
import ShapeTokenConfig from './ShapeTokenConfig'; 
import NumberTokenConfig from './NumberTokenConfig'; 

/*GLOBAL values used for token, rule ids*/
var GLOBAL_ID = 1; 
var TOKEN_BASE = 9000; 
var PTOKEN_BASE = 8000; 
var RULE_BASE = 7000; 
var GLOBAL_RULE_ID = 1; 

var GLOBAL_COUNT=1; 
/*
The Rule class holds the different token. There can be multiple rules. 
*/
class Rule extends Component
{
    constructor(props)
    {
        super(props); 
        
        const btt = <PlusToken  id={PTOKEN_BASE+(++GLOBAL_ID)}  clickable="1" onClick={this.handleClick.bind(this)}/>; 
        this.state = {
            array:[btt], 
            isWordDialogOpen: false,
            isNumberDialogOpen: false,
            isShapeDialogOpen:false, 
            isPunctuationDialogOpen: false,
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

        /* You need to bind all the function.
        Need in React
        if you don't bind like this you will get an error like 
        TypeError: Cannot read property 'setState' of null
        */
        this.handleClick = this.handleClick.bind(this);
        this.toggleWordConfigDialog = this.toggleWordConfigDialog.bind(this); 
        this.toggleNumberConfigDialog = this.toggleNumberConfigDialog.bind(this); 
        this.toggleShapeConfigDialog = this.toggleShapeConfigDialog.bind(this); 
        this.showWordToken = this.showWordToken.bind(this); 
        this.onAddWordToken = this.onAddWordToken.bind(this); 
        this.onAddNumberToken = this.onAddNumberToken.bind(this); 
        this.createWordToken = this.createWordToken.bind(this); 
        this.createWordJSON = this.createWordJSON.bind(this); 
    }

    componentWillMount() 
    {
        const id = RULE_BASE+(++GLOBAL_RULE_ID); 
        this.setState({id: id});
        const myIdentifier = "name"+"_"+"rule"+"_"+id; 
        this.setState({identifier:myIdentifier}); 
    }

  
    
    handleClick(e) 
    {  
        /* Let's determine when to show/close the menu when the 
        plus token is clicked. 
        */  
        //alert("You clicked on "+e.target)
        //alert("handleclick - " + this.state.id); 

        const tMenu = "tokenMenu" + this.state.id; 

        var x = document.getElementById(tMenu);
        if (x.style.display === 'none' || x.style.display === '') 
        {
            x.style.display = 'block';
        } else 
        {
            x.style.display = 'none';
        }
    }

    /*
    This method is used to determine when to open or close the token dialog
    */
    toggleWordConfigDialog()
    {
        this.setState({
         isWordDialogOpen: !this.state.isWordDialogOpen
        });        
    }


    /*
    This method is used to determine when to open or close the token dialog
    */
    toggleNumberConfigDialog()
    {
        this.setState({
         isNumberDialogOpen: !this.state.isNumberDialogOpen
        });        
    }

    /*
    This method is used to determine when to open or close the token dialog
    */
    toggleShapeConfigDialog()
    {
        this.setState({
         isShapeDialogOpen: !this.state.isShapeDialogOpen
        });        
    }
    /*
    This method will create a new token and json data for the token. The json 
    formatted data is also sent all the way to the App.js where we deal with 
    all webservice communications. 
    */
    createWordToken(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)
    {
        //Keep track of the token with a generated token id. 
        var tokenid = TOKEN_BASE+(++GLOBAL_ID); 

        /*Get the JSON formatted data structure*/
        this.createWordJSON(tokenid, tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 

        /*Now lets create a new token that we are doing to display in the GUI. 
        */
        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
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

    /*  
    This method is used to format our data so that it look like the JSON 
    that the webservice is expecting. 
    */
    createWordJSON(tokenid, tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)
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
        var myShape= [];  

        var tokenData=
        {
            prefix: prefix1,
            suffix: suffix1,
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:"",
            minimum:"", 
            shape: myShape,
            token: allwords1,
            numbers: myNumbers,
            contain_digit: "",
            is_in_vocabulary: "",
            is_out_of_vocabulary: "",
            is_required: !optional1? "true": "false", 
            type: type1, 
            is_in_output: part_of_output1?"true":"false"
        }; 


        /*We need to save the JSON and send up the top level of the application layer. */

        //Let's store the Token data in a map in the state. 
        //We store by tokenid as the key.
        //First grab the current copy from the component state - you can't mutate direct in the 
        //the state object. 
        var myTokenData = this.state.allTokenData; 

        //let's update this particular token with tokenid give it the new newJSONTokenData
        //So each time this particular token is updated we update the map. 
        myTokenData[tokenid] = tokenData; 
        //var size = Object.keys(myTokenData).length;
        //console.log("createNewToken: size of the all tokens. ="+size); 

        //Let's update the state with our new map data. 
        this.setState({
            allTokenData: myTokenData
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format ); 

        return tokenData; 
    }


    /*
    Method: Add a token to an array. 
    Arguments: 
    NewToken: a word, shape, punctionation token 
    */
    onAddWordToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, followed_by_space1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1) 
    {
        //alert("addNewToken + id" + this.state.id);
        //Let's close the token modal dialog box. 
        this.toggleWordConfigDialog();

        //Keep track of the token with a generated token id. 
        var tokenid = TOKEN_BASE+(++GLOBAL_ID); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createWordJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        //Let's store the Token data in a map in the state. 
        //We store by tokenid as the key.
        //First grab the current copy from the component state - you can't mutate direct in the 
        //the state object. 
        var myTokenData = this.state.allTokenData; 

        //let's update this particular token with tokenid give it the new newJSONTokenData
        //So each time this particular token is updated we update the map. 
        myTokenData[tokenid] = newJSONTokenData; 
        //var size = Object.keys(myTokenData).length;
        //console.log("createNewToken: size of the all tokens. ="+size); 

        //Let's update the state with our new map data. 
        this.setState({
            allTokenData: myTokenData
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format ); 

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 

        /*Now lets create a new token that we are doing to display in the GUI. 
        */
        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
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

        /*We always need a plus token between regular token*/
        const btt = <PlusToken id={PTOKEN_BASE + (++GLOBAL_ID)} clickable="1" onClick={this.handleClick.bind(this)} />;

        /*Let's update the token array in the state that way it re-renders the rules.*/
        this.setState(prevState =>
            ({
                array: [...prevState.array, newToken, btt]
            }));

    }  

    onAddNumberToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, followed_by_space1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1) 
    {
        this.toggleNumberConfigDialog; 


    }


    showPunctuationToken()
    {


    }


    /*
    Show Word token. 
    */
    showWordToken()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.toggleWordConfigDialog();
    }

    render() 
	{


        const tMenu = "tokenMenu" + this.state.id; 
        return (
            <section>
                <div className="rulewrapper">
                
                    {/*
                    <WordConfigDialog show={this.state.isWordDialogOpen}
                    onClose={this.addNewToken}> ruleid={this.props.ruleid}
                    </WordTokenConfig>
                    */} 
                    
                    {                 
                    <WordTokenConfig show={true}
                        onAddNewToken={this.onAddWordToken} ruleid={this.state.id}
                         onCloseTokenConfig={this.toggleWordConfigDialog}>
                       
                    </WordTokenConfig>
                    }
                    {/*
                    <ShapeTokenConfig show={false}
                        onAddNewToken={this.addNewToken} ruleid={this.state.id}
                         onCloseWordTokenConfig={this.toggleShapeConfigDialog}>
                       
                    </ShapeTokenConfig>
                    */}

                                        {
                    <NumberTokenConfig show={false}
                        onAddNumberToken={this.onAddNumberToken} ruleid={this.state.id}
                         onCloseWordTokenConfig={this.toggleShapeConfigDialog}>
                       
                    </NumberTokenConfig>
                    }


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

                     <div  >
                        <div id={tMenu} className="tokenMenu" >
                            <div onClick={this.showWordToken}> word </div>
                            <div> number </div> 
                            <div> shape </div>
                            <div> punctuation {this.showPunctuationToken} </div>
                        </div>   

                        <div className="arrangeRuleTokens"> 


                            <input type="checkbox" name="rule" value="word" className="ruleCheckBox" /> 

                            {this.state.array.map((token, index) => (
                                <div className="arrangeEachToken">  {token}   </div>
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