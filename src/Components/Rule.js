import React, { Component } from 'react';
import Token from './Token'
import PlusToken from './PlusToken'
import "../rule.css"
import WordTokenConfig from './WordTokenConfig';
import ShapeTokenConfig from './ShapeTokenConfig'; 
import NumberTokenConfig from './NumberTokenConfig'; 
import PunctuationTokenConfig from './PunctuationTokenConfig'; 
import TokenWrapper from './TokenWrapper'; 

/*GLOBAL values used for token, rule ids*/
var GLOBAL_ID = 1; 
var TOKEN_BASE = 9000; 
var PTOKEN_BASE = 8000; 
var RULE_BASE = 7000; 
var GLOBAL_RULE_ID = 1; 

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
            tokenDataArray: [],
            tokenArray:[],
            isWordDialogOpen: false,
            isNumberDialogOpen: false,
            isPunctuationDialogOpen: false,
            isShapeDialogOpen: false,
            allTokenData:[],
            value: 10, 
            id:RULE_BASE+(++GLOBAL_RULE_ID), 
            description:"", 
            polarity: [],
            output_format:"",
            is_active: true, 
            identifier:"",
            is_in_output:true,
            isModifyWord: false,
            isModifyPunctuation: false, 
            isModifyNumbers: false, 
            tokenModifyIndex: -1,
            isModifyShape: false, 
            newToken2AddIndex: -1

        }

        //this.description  = this.props.ruleObj.description,
        //this.output_format  = this.props.ruleObj.output_format,
        //this.is_active = (this.props.ruleObj.is_active === "true"),
        //this.identifier  = this.props.ruleObj.identifier

        /* You need to bind all the function.
        Need in React
        if you don't bind like this you will get an error like 
        TypeError: Cannot read property 'setState' of null
        */
        this.handleClick = this.handleClick.bind(this);
        this.toggleWordConfigDialog = this.toggleWordConfigDialog.bind(this); 
        this.toggleNumberConfigDialog = this.toggleNumberConfigDialog.bind(this); 
        this.toggleShapeConfigDialog = this.toggleShapeConfigDialog.bind(this); 
        this.togglePunctuationConfigDialog = this.togglePunctuationConfigDialog.bind(this); 
        this.showWordToken = this.showWordToken.bind(this); 
        this.onAddWordToken = this.onAddWordToken.bind(this); 
        this.onAddNumberToken = this.onAddNumberToken.bind(this); 
        this.onAddPunctuationToken = this.onAddPunctuationToken.bind(this); 
        this.onAddShapeToken = this.onAddShapeToken.bind(this); 
        //this.createWordToken = this.createWordToken.bind(this); 
        this.createWordJSON = this.createWordJSON.bind(this); 
        this.createNumberJSON = this.createNumberJSON.bind(this); 
        this.createPunctuationJSON = this.createPunctuationJSON.bind(this); 
        this.createShapeJSON = this.createShapeJSON.bind(this); 
        this.showNumberToken = this.showNumberToken.bind(this); 
        this.showPunctuationToken = this.showPunctuationToken.bind(this); 
        this.showShapeToken = this.showShapeToken.bind(this); 
        this.deleteToken = this.deleteToken.bind(this); 
        this.handleChange_outformat = this.handleChange_outformat.bind(this); 
        this.handleChange_description = this.handleChange_description.bind(this); 
        this.loadTokensFromServer = this.loadTokensFromServer.bind(this); 
        this.onEditToken = this.onEditToken.bind(this); 
        this.onModifyWordToken = this.onModifyWordToken.bind(this); 
        this.onModifyPunctuationToken = this.onModifyPunctuationToken.bind(this); 
        this.onModifyNumberToken = this.onModifyNumberToken.bind(this);
        this.onModifyShapeToken = this.onModifyShapeToken.bind(this);  
        this.handle_onBlur = this.handle_onBlur.bind(this);
        this.updateActiveRule = this.updateActiveRule.bind(this);  
        this.onClickPlusToken = this.onClickPlusToken.bind(this); 
        this.ProcessAllNewTokens = this.ProcessAllNewTokens.bind(this); 
        this.deleteRule = this.deleteRule.bind(this); 
        this.duplicate = this.duplicate.bind(this); 


    }

    componentWillMount() 
    {
        //const id = RULE_BASE+(++GLOBAL_RULE_ID); 
        //this.setState({id: id});
        //var myRuleObj = this.props.ruleObj; 
        //this.setState({ ruleObj: myRuleObj}); 

        if(this.props.createdby !== window.CREATEDBY_SERVER)
        {
            console.log("Rule was created by user")
            const myIdentifier = "name_rule_"+this.state.id; 
            this.setState({identifier:myIdentifier}); 
        }
        else
        {
            console.log("Rule was created from server"); 
            this.loadTokensFromServer(); 
        }
    }

    handleClick(e) 
    {  
        /* Let's determine when to show/close the menu when the 
        plus token is clicked. 
        */

        //reset some variable. 

        /*@Wole turn this off for now. 07/22
        this.setState({
            isModifyWord:false,
            tokenModifyIndex: -1
        })

        const tMenu = "tokenMenu" + this.state.id; 

        var x = document.getElementById(tMenu);
        if (x.style.display === 'none' || x.style.display === '') 
        {
            x.style.display = 'block';
        } else 
        {
            x.style.display = 'none';
        }
        */
    }

    /*
    This method is used to determine when to open or close the token dialog
    */
    toggleWordConfigDialog()
    {
        this.setState({
         isWordDialogOpen: !this.state.isWordDialogOpen
        });  
        
        //Once the dialog closes, we need to turn off modify if it's still on. 
        if(!this.setState.isWordDialogOpen)
        {   
            this.setState({
                isModifyWord:false
            })
        }
    }

        /*
    This method is used to determine when to open or close the token dialog
    */
    toggleShapeConfigDialog()
    {
        this.setState({
         isShapeDialogOpen: !this.state.isShapeDialogOpen
        });  
        
        //Once the dialog closes, we need to turn off modify if it's still on. 
        if(!this.setState.isShapeDialogOpen)
        {   
            this.setState({
                isModifyShape:false
            })
        }
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
    togglePunctuationConfigDialog()
    {
        this.setState({
         isPunctuationDialogOpen: !this.state.isPunctuationDialogOpen
        });    
        
                //Once the dialog closes, we need to turn off modify if it's still on. 
        if(!this.setState.isWordDialogOpen)
        {   
            this.setState({
                isModifyPunctuation:false
            })
        }
    }

    loadTokensFromServer()
    {
        var myToken; 
        var count = this.props.ruleObj.pattern.length; 

    
        this.setState({
            description : this.props.ruleObj.description,
            output_format : this.props.ruleObj.output_format,
            is_active : (this.props.ruleObj.is_active === "true"),
            identifier : this.props.ruleObj.identifier
        })
        
        console.log("Rule->loadTokensFromServer.....description = " + this.setState.description); 
        for(var i = 0; i < count; i++) 
        {
            myToken = this.props.ruleObj.pattern[i]; 
            var myarr = myToken.part_of_speech; 
            var myarr1 = myToken.capitalization; 
            if( myToken.type === window.TYPE_WORD)
            {

                this.onAddWordToken("W",window.TYPE_WORD, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true', myToken.is_followed_by_space === 'true', 0, 0, 0,
                    myToken.prefix, myToken.suffix, myToken.is_in_vocabulary, (myarr.indexOf(window.POS_noun) > -1), (myarr.indexOf(window.POS_pronoun) > -1), (myarr.indexOf(window.POS_punctuation) > -1),
                    (myarr.indexOf(window.POS_propernoun) > -1), (myarr.indexOf(window.POS_determiner) > -1), (myarr.indexOf(window.POS_symbol) > -1), (myarr.indexOf(window.POS_adjective) > -1), (myarr.indexOf(window.POS_conjunction) > -1),(myarr.indexOf(window.POS_verb) > -1),  
                    (myarr.indexOf("prepost_position") > -1), (myarr.indexOf(window.POS_adverb) > -1), (myarr.indexOf(window.POS_particle) > -1), (myarr.indexOf(window.POS_interjection) > -1), (myarr1.indexOf("exact") > -1),(myarr1.indexOf("lower") > -1), (myarr1.indexOf("upper") > -1),
                    (myarr1.indexOf("title") > -1), (myarr1.indexOf("mixed") > -1), myToken.numbers, window.CREATEDBY_SERVER);            
            }
            else if (myToken.type === window.TYPE_NUMBERS)
            {
                this.onAddNumberToken("#",window.TYPE_NUMBERS, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true', myToken.is_followed_by_space === 'true', 0, 0, 0,
                    myToken.minimum, myToken.maximum, myToken.is_in_vocabulary, (myarr.indexOf(window.POS_noun) > -1), (myarr.indexOf(window.POS_pronoun) > -1), (myarr.indexOf(window.POS_punctuation) > -1),
                    (myarr.indexOf(window.POS_propernoun) > -1), (myarr.indexOf(window.POS_determiner) > -1), (myarr.indexOf(window.POS_symbol) > -1), (myarr.indexOf(window.POS_adjective) > -1), (myarr.indexOf(window.POS_conjunction) > -1),(myarr.indexOf(window.POS_verb) > -1),  
                    (myarr.indexOf("prepost_position") > -1), (myarr.indexOf(window.POS_adverb) > -1), (myarr.indexOf(window.POS_particle) > -1), (myarr.indexOf(window.POS_interjection) > -1), (myarr1.indexOf("exact") > -1),(myarr1.indexOf("lower") > -1), (myarr1.indexOf("upper") > -1),
                    (myarr1.indexOf("title") > -1), (myarr1.indexOf("mixed") > -1), myToken.numbers, window.CREATEDBY_SERVER);            
            }
            else if (myToken.type === window.TYPE_PUNCTUATION)
            {
                this.onAddPunctuationToken("P", window.TYPE_PUNCTUATION, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true',window.CREATEDBY_SERVER); 
            }
            else if( myToken.type === window.TYPE_SHAPE)
            {
                this.onAddShapeToken("S",window.TYPE_SHAPE, myToken.token, !(myToken.is_required==='true'), 
                    myToken.is_in_output==='true', myToken.is_followed_by_space === 'true', 0, 0, 0,
                    myToken.prefix, myToken.suffix, myToken.is_in_vocabulary, (myarr.indexOf(window.POS_noun) > -1), (myarr.indexOf(window.POS_pronoun) > -1), (myarr.indexOf(window.POS_punctuation) > -1),
                    (myarr.indexOf(window.POS_propernoun) > -1), (myarr.indexOf(window.POS_determiner) > -1), (myarr.indexOf(window.POS_symbol) > -1), (myarr.indexOf(window.POS_adjective) > -1), (myarr.indexOf(window.POS_conjunction) > -1),(myarr.indexOf(window.POS_verb) > -1),  
                    (myarr.indexOf("prepost_position") > -1), (myarr.indexOf(window.POS_adverb) > -1), (myarr.indexOf(window.POS_particle) > -1), (myarr.indexOf(window.POS_interjection) > -1), (myarr1.indexOf("exact") > -1),(myarr1.indexOf("lower") > -1), (myarr1.indexOf("upper") > -1),
                    (myarr1.indexOf("title") > -1), (myarr1.indexOf("mixed") > -1), myToken.numbers,myToken.shapes, window.CREATEDBY_SERVER);            
            }
            
        }
    }

    onEditToken(index)
    {
        let dataIndex = Math.round((index-1)/2); 
        console.log("OnEditToken index = " + index + " data index = " + dataIndex);
        console.log("What kind of token is this " + this.state.allTokenData[dataIndex].type); 
        if(this.state.allTokenData[dataIndex].type === window.TYPE_WORD)
        {
            console.log("Tokens are = " + this.state.allTokenData[dataIndex].token); 
            this.toggleWordConfigDialog(); 
            this.setState({
                isModifyWord:true,
                tokenModifyIndex: dataIndex
            })
        }
        else if(this.state.allTokenData[dataIndex].type === window.TYPE_PUNCTUATION)
        {
            console.log("Tokens are = " + this.state.allTokenData[dataIndex].token); 
            this.togglePunctuationConfigDialog(); 
            this.setState({
                isModifyPunctuation:true,
                tokenModifyIndex: dataIndex
            }); 
        }
        else if(this.state.allTokenData[dataIndex].type === window.TYPE_NUMBERS)
        {
            console.log("Tokens are = " + this.state.allTokenData[dataIndex].numbers); 
            this.toggleNumberConfigDialog(); 
            this.setState({
                isModifyNumbers:true,
                tokenModifyIndex: dataIndex
            }); 
        }
        else if(this.state.allTokenData[dataIndex].type === window.TYPE_SHAPE)
        {
            console.log("Tokens are = " + this.state.allTokenData[dataIndex].shapes); 
            this.toggleShapeConfigDialog(); 
            this.setState({
                isModifyShape:true,
                tokenModifyIndex: dataIndex
            }); 
        }


    }


    /*  
    This method is used to format our data so that it look like the JSON 
    that the webservice is expecting. 
    */
    createWordJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)
    {

        var myCapitalization = [];
        var ret; 
        ret = exact1? myCapitalization.push("exact"):myCapitalization; 
        ret = lower1? myCapitalization.push("lower"):myCapitalization; 
        ret = upper1? myCapitalization.push("upper"):myCapitalization; 
        ret = mixed1? myCapitalization.push("mixed"): myCapitalization;
        ret = title1? myCapitalization.push("title"): myCapitalization;
        

        var mypartOfSpeech = []; 
        ret = noun1? mypartOfSpeech.push(window.POS_noun): mypartOfSpeech;
        ret = pronoun1? mypartOfSpeech.push(window.POS_pronoun): mypartOfSpeech;
        ret = propernoun1? mypartOfSpeech.push(window.POS_propernoun): mypartOfSpeech;        
        ret = determiner1? mypartOfSpeech.push(window.POS_determiner): mypartOfSpeech;
        ret = symbol1? mypartOfSpeech.push(window.POS_symbol): mypartOfSpeech;
        ret = adjective1? mypartOfSpeech.push(window.POS_adjective): mypartOfSpeech;
        ret = conjunction1? mypartOfSpeech.push(window.POS_conjunction): mypartOfSpeech;
        ret = verb1? mypartOfSpeech.push(window.POS_verb): mypartOfSpeech;
        ret = prepost_position1? mypartOfSpeech.push(window.POS_pre_post_position): mypartOfSpeech;
        ret = adverb1? mypartOfSpeech.push(window.POS_adverb): mypartOfSpeech;
        ret = particle1? mypartOfSpeech.push(window.POS_particle): mypartOfSpeech;
        ret = interjection1? mypartOfSpeech.push(window.POS_interjection): mypartOfSpeech;

        var myLength=[]; 
        ret = length11>0? myLength.push(length11): myLength; 
        ret = length21>0? myLength.push(length21): myLength; 
        ret = length31>0? myLength.push(length31): myLength;     

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
            shapes: myShape,
            token: allwords1,
            numbers: myNumbers,
            contain_digit: "",
            is_in_vocabulary: "",
            is_out_of_vocabulary: "",
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            is_followed_by_space: false            
        }; 
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
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onAddWordToken word="+allwords1); 

        //alert("addNewToken + id" + this.state.id);
        //Let's close the token modal dialog box. 
        if(createdby === window.CREATEDBY_USER)
            this.toggleWordConfigDialog();



        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createWordJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 
    }  



    
    /*
    Method: Add a token to an array. 
    Arguments: 
    NewToken: a word, shape, punctionation token 
    */
    onModifyWordToken(index, tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, followed_by_space1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onModifyWordToken word="+allwords1); 

        //alert("addNewToken + id" + this.state.id);
        //Let's close the token modal dialog box. 
        if(createdby === window.CREATEDBY_USER)
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

        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens. 
        myTokenData.splice(index, 1, newJSONTokenData); 


        //Let's update the state with our new map data. 
        this.setState({
            allTokenData: myTokenData
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, myTokenData, 
                    this.state.identifier, this.state.description, this.state.polarity, 
                    this.state.is_active, this.state.output_format, createdby ); 

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 

        /*Now lets create a new token that we are doing to display in the GUI. 
        */
        var myTokens = this.state.array; 

        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            tokenPatternData={newJSONTokenData} deleteToken={this.deleteToken} />

        myTokens.splice(((2*index)+1),1,newToken); 
        /*We always need a plus token between regular token*/
        /*Let's update the token array in the state that way it re-renders the rules.*/
        this.setState(prevState =>
            ({
                array: myTokens
            }));

    }      

        /*  
    This method is used to format our data so that it look like the JSON 
    that the webservice is expecting. 
    */
    createShapeJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1, shapes)
    {
        console.log("createShapeJSON"); 

        var myCapitalization = [];
        var ret; 
        ret = exact1? myCapitalization.push("exact"):myCapitalization; 
        ret = lower1? myCapitalization.push("lower"):myCapitalization; 
        ret = upper1? myCapitalization.push("upper"):myCapitalization; 
        ret = mixed1? myCapitalization.push("mixed"): myCapitalization;
        ret = title1? myCapitalization.push("title"): myCapitalization;
        

        var mypartOfSpeech = []; 
        ret = noun1? mypartOfSpeech.push(window.POS_noun): mypartOfSpeech;
        ret = pronoun1? mypartOfSpeech.push(window.POS_pronoun): mypartOfSpeech;
        ret = propernoun1? mypartOfSpeech.push(window.POS_propernoun): mypartOfSpeech;        
        ret = determiner1? mypartOfSpeech.push(window.POS_determiner): mypartOfSpeech;
        ret = symbol1? mypartOfSpeech.push(window.POS_symbol): mypartOfSpeech;
        ret = adjective1? mypartOfSpeech.push(window.POS_adjective): mypartOfSpeech;
        ret = conjunction1? mypartOfSpeech.push(window.POS_conjunction): mypartOfSpeech;
        ret = verb1? mypartOfSpeech.push(window.POS_verb): mypartOfSpeech;
        ret = prepost_position1? mypartOfSpeech.push(window.POS_pre_post_position): mypartOfSpeech;
        ret = adverb1? mypartOfSpeech.push(window.POS_adverb): mypartOfSpeech;
        ret = particle1? mypartOfSpeech.push(window.POS_particle): mypartOfSpeech;
        ret = interjection1? mypartOfSpeech.push(window.POS_interjection): mypartOfSpeech;

        var myLength=[]; 
        ret = length11>0? myLength.push(length11): myLength; 
        ret = length21>0? myLength.push(length21): myLength; 
        ret = length31>0? myLength.push(length31): myLength;     

        var tokenData=
        {
            prefix: prefix1,
            suffix: suffix1,
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:"",
            minimum:"", 
            shapes: shapes,
            token: [],
            numbers: [],
            contain_digit: "",
            is_in_vocabulary: "",
            is_out_of_vocabulary: "",
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            is_followed_by_space: false            
        }; 
        return tokenData; 
    }

    /*
    Method: Add a token to an array. 
    Arguments: 
    NewToken: a word, shape, punctionation token 
    */
    onAddShapeToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, followed_by_space1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1,  shapes1, createdby) 
    {
        console.log("Rule: Enter onAddShapeToken shapes = "+shapes1); 

        //alert("addNewToken + id" + this.state.id);
        //Let's close the token modal dialog box. 
        if(createdby === window.CREATEDBY_USER)
            this.toggleShapeConfigDialog();

        //Keep track of the token with a generated token id. 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createShapeJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1, shapes1
        )
        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 
    }


    ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby)
    {
        //Keep track of the token with a generated token id. 
        var tokenid = TOKEN_BASE+(++GLOBAL_ID); 
        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens. 
        //myTokenData.push(newJSONTokenData); 

        //Let's update the state with our new map data. 
        //console.log("Location of new token to add = "  + this.state.newToken2AddIndex); 

        //Add the new token to the array of tokens. 
        if(this.state.newToken2AddIndex!= -1)
        {
            myTokenData.splice(this.state.newToken2AddIndex/2, 0, newJSONTokenData); 
        }
        else
        {
            myTokenData.push(newJSONTokenData); 
           
        }


        this.setState({
            allTokenData: myTokenData,
            createdby: createdby
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
/*        
        this.props.onProcessJSONData(this.state.id, myTokenData, 
                    this.state.identifier, this.state.description, this.state.polarity, 
                    this.state.is_active, this.state.output_format,createdby ); 
*/

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 

        /*Now lets create a new token that we are doing to display in the GUI. 
        */
        var myTokens = this.state.array; 

        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            tokenPatternData={newJSONTokenData} deleteToken={this.deleteToken} />

        /*We always need a plus token between regular token*/
        const btt = <PlusToken id={PTOKEN_BASE + (++GLOBAL_ID)} clickable="1" onClick={this.handleClick.bind(this)} />;

        if(this.state.newToken2AddIndex!= -1)
        {
            myTokens.splice(this.state.newToken2AddIndex+1,0,newToken, btt); 
        }
        else
        {
            myTokens.push(newToken)
            myTokens.push(btt);   
        }

        /*Let's update the token array in the state that way it re-renders the rules.*/
       this.setState(
            {
                array: myTokens
            });

    }  


    componentDidUpdate(prevProps, prevState)
    {
        console.log("Rule->componentDidUpdate..."); 
        this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                    this.state.identifier, this.state.description, this.state.polarity, 
                    this.state.is_active, this.state.output_format,this.state.createdby );        
    }


    onModifyShapeToken(index, tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, followed_by_space1, length11, length21, length31,
        prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, shapes1, createdby) 
    {
        console.log("Rule: Enter onModifyShapeToken word="+allwords1); 

        //alert("addNewToken + id" + this.state.id);
        //Let's close the token modal dialog box. 
        if(createdby === window.CREATEDBY_USER)
            this.toggleShapeConfigDialog();

        //Keep track of the token with a generated token id. 
        var tokenid = TOKEN_BASE+(++GLOBAL_ID); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createShapeJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            prefix1, suffix1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1, shapes1
        )

        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens. 
        myTokenData.splice(index, 1, newJSONTokenData); 


        //Let's update the state with our new map data. 
        this.setState({
            allTokenData: myTokenData
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. 
        NOTE: For the value that I am changing in this method, I use the stack value not 
        the state value because the state value is not updated until after rendering. 
        so in this case I am passing myTokenData which is a local value. 
        */
        this.props.onProcessJSONData(this.state.id, myTokenData, 
                    this.state.identifier, this.state.description, this.state.polarity, 
                    this.state.is_active, this.state.output_format, createdby ); 

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 

        /*Now lets create a new token that we are doing to display in the GUI. 
        */
        var myTokens = this.state.array; 

        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            tokenPatternData={newJSONTokenData} deleteToken={this.deleteToken} />

        myTokens.splice(((2*index)+1),1,newToken); 

        /*We always need a plus token between regular token*/
        /*Let's update the token array in the state that way it re-renders the rules.*/
        this.setState(prevState =>
            ({
                array: myTokens
            }));

    }      


    onModifyNumberToken(index, tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, followed_by_space1, length11, length21, length31,
        minimum1, maximum1, notinvocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onModifyNumberToken"); 


        if(createdby === window.CREATEDBY_USER)
            this.toggleNumberConfigDialog(); 
        
        //Keep track of the token with a generated token id. 
        var tokenid = TOKEN_BASE+(++GLOBAL_ID); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createNumberJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens by replacing 
        myTokenData.splice(index, 1, newJSONTokenData); 

        //Let's update the state with our new map data. 
        this.setState({
            allTokenData: myTokenData
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. 
        NOTE: For the value that I am changing in this method, I use the stack value not 
        the state value because the state value is not updated until after rendering. 
        so in this case I am passing myTokenData which is a local value. 
        */
        this.props.onProcessJSONData(this.state.id, myTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format,createdby ); 

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 

        /*Now lets create a new token that we are doing to display in the GUI. 
        */
       var myTokens = this.state.array; 

        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            tokenPatternData={newJSONTokenData} deleteToken={this.deleteToken} />

        myTokens.splice(((2*index)+1),1,newToken); 

        /*Let's update the token array in the state that way it re-renders the rules.*/
        this.setState(prevState =>
            ({
                array: myTokens
            }));
    }

    onAddNumberToken(tokenAbbreviation1, type1, allwords1, optional1,
        part_of_output1, followed_by_space1, length11, length21, length31,
        minimum1, maximum1, notinvocabulary1, noun1, pronoun1, punctuation1,
        propernoun1, determiner1, symbol1, adjective1, conjunction1, verb1,
        prepost_position1, adverb1, particle1, interjection1, exact1, lower1, upper1,
        title1, mixed1, numbers1, createdby) 
    {
        console.log("Rule: Enter onAddNumberToken"); 
        if(createdby === window.CREATEDBY_USER)
            this.toggleNumberConfigDialog(); 

        /*Get the JSON formatted data structure*/
        var newJSONTokenData = this.createNumberJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1
        )

        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 

    }

    onModifyPunctuationToken(index, tokenAbbreviation1, type1,allPunctuations,optional1,
        part_of_output1, createdby) 
    {
        console.log("Rule: Enter onModifyPunctuationToken"); 
        if(createdby === window.CREATEDBY_USER)
            this.togglePunctuationConfigDialog(); 

        //Keep track of the token with a generated token id. 
        var tokenid = TOKEN_BASE+(++GLOBAL_ID); 

        var newJSONTokenData = this.createPunctuationJSON(tokenAbbreviation1,type1, allPunctuations, optional1, 
            part_of_output1);    
            
        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens. 
        myTokenData.splice(index, 1, newJSONTokenData); 

        //Let's update the state with our new map data. 
        this.setState({
            allTokenData: myTokenData
        });

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. 
        NOTE: For the value that I am changing in this method, I use the stack value not 
        the state value because the state value is not updated until after rendering. 
        so in this case I am passing myTokenData which is a local value. 
        */
        this.props.onProcessJSONData(this.state.id, myTokenData, 
                this.state.identifier, this.description, this.polarity, 
                this.state.is_active, this.output_format,createdby ); 

        //console.log("Here is  my JSON = " + JSON.stringify(this.state.allTokenData)); 

        /*Now lets create a new token that we are doing to display in the GUI. 
        * Note that words and punctions interchange. 
        */
       var myTokens = this.state.array; 

        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            tokenPatternData={newJSONTokenData} deleteToken={this.deleteToken} />

        myTokens.splice(((2*index)+1),1,newToken); 

        /*Let's update the token array in the state that way it re-renders the rules.*/
        this.setState(prevState =>
            ({
                array: myTokens
            }));
    }

    onAddPunctuationToken(tokenAbbreviation1, type1,allPunctuations,optional1,
        part_of_output1, createdby) 
    {
        console.log("Rule: Enter onAddPunctuationToken"); 
        
        if(createdby === window.CREATEDBY_USER)
            this.togglePunctuationConfigDialog(); 

        var newJSONTokenData = this.createPunctuationJSON(tokenAbbreviation1,type1, allPunctuations, optional1, 
            part_of_output1);    
                
        this.ProcessAllNewTokens(newJSONTokenData, tokenAbbreviation1, createdby); 

    }

    createPunctuationJSON(tokenAbbreviation1,type1, allPunctuations, optional1, 
            part_of_output1)
    {
        console.log("createPunctuationJSON"); 

        var myCapitalization = [];

        var mypartOfSpeech = []; 

        var myLength=[];    

        var myShape= []; 

        var tokenData=
        {
            prefix: "",
            suffix: "",
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:"",
            minimum:"", 
            shapes: myShape,
            token: allPunctuations,
            numbers: [],
            contain_digit: "",
            is_in_vocabulary: "",
            is_out_of_vocabulary: "",
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            is_followed_by_space: false            
        }; 

        return tokenData; 
    }

    /*  
    This method is used to format our data so that it look like the JSON 
    that the webservice is expecting. 
    */
    createNumberJSON(tokenAbbreviation1,type1, allwords1, optional1, 
            part_of_output1, followed_by_space1, length11, length21, length31,
            minimum1, maximum1, notinvocabulary1, noun1, pronoun1, punctuation1,
            propernoun1, determiner1, symbol1, adjective1, conjunction1,verb1,  
            prepost_position1, adverb1, particle1, interjection1, exact1,lower1, upper1,
            title1, mixed1, numbers1)
    {

        console.log("createNumberJSON"); 

        var myCapitalization = [];

        var mypartOfSpeech = []; 

        var myLength=[]; 
        var ret; 
        ret = length11>0? myLength.push(length11): myLength; 
        ret = length21>0? myLength.push(length21): myLength; 
        ret = length31>0? myLength.push(length31): myLength;     

        var myShape= [];  

        var tokenData=
        {
            prefix: "",
            suffix: "",
            capitalization:  myCapitalization, 
            part_of_speech: mypartOfSpeech, 
            length: myLength,
            maximum:minimum1,
            minimum:maximum1, 
            shape: myShape,
            token: [],
            numbers: numbers1,
            contain_digit: "",
            is_in_vocabulary: "",
            is_out_of_vocabulary: "",
            is_required: !optional1, 
            type: type1, 
            is_in_output: part_of_output1,
            is_followed_by_space: false            
        }; 

        return tokenData; 
    }

    showNumberToken()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.toggleNumberConfigDialog();       
    }

    showPunctuationToken()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.togglePunctuationConfigDialog(); 
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

    /*
    Show Word token. 
    */
    showShapeToken()
    {
        const tMenu = "tokenMenu" + this.state.id; 
        
        /*lets close the menu*/
        var x = document.getElementById(tMenu);
        x.style.display = 'none';
        this.toggleShapeConfigDialog();
    }    

    
    deleteToken(index)
    {
        let dataIndex = Math.round((index-1)/2); 
        console.log("deleteToken index = " + index + " data index = " + dataIndex);

        //Get the state token array. 
        var myTokenData = this.state.allTokenData; 

        //Add the new token to the array of tokens. 
        myTokenData.splice(dataIndex, 1); 
        this.setState(
            {
                allTokenData: myTokenData
            }
        )

        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. 
        NOTE: For the value that I am changing in this method, I use the stack value not 
        the state value because the state value is not updated until after rendering. 
        so in this case I am passing myTokenData which is a local value. 
        */
        this.props.onProcessJSONData(this.state.id, myTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format, window.CREATEDBY_USER ); 
        

        var myTokens = this.state.array; 
/*
        const newToken = <Token id={tokenid} clickable="0" tokenAbbreviation={tokenAbbreviation1}
            tokenPatternData={newJSONTokenData} deleteToken={this.deleteToken} />
*/
        myTokens.splice(index,2); 

        this.setState(prevState =>
            ({
                array: myTokens
            }));

    }        

    onClickPlusToken(index)
    {
        console.log("Rule->onClickPlusToken....index = " + index); 
        /* Let's determine when to show/close the menu when the 
        plus token is clicked. 
        */

        //reset some variable. 
        this.setState({
            newToken2AddIndex: index
        })

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

    handleChange_outformat(event)
    {
        console.log("Rule: Enter handleChange_outformat name = "+ event.target.name + " value = " + event.target.value); 
        this.setState({
        [event.target.name]: event.target.value
        });  
        console.log("Rule: new state output format = " + this.state.description); 
    
    }

    handleChange_description(event)
    {
        console.log("Rule: Enter handleChange_description name = "+ event.target.name + " value = " + event.target.value); 
        var myDescr = event.target.value;      
        this.setState({
           description: myDescr
        });   

        console.log("Rule: new state description = " + this.state.description); 
    }

    /*lets update the webservice when the mouse is moved from description and output format inputs*/
    handle_onBlur(event)
    {
        console.log("handle_onBlur"); 
        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format, window.CREATEDBY_USER ); 
        
    }

    updateActiveRule(event)
    {
        console.log("Rule->updateActiveRule toggling rule active = " + event.target.checked ) ; 

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });     


        /* All the webservice conmunication is done in App.js. So we need to propagate
        all data to the top in App.js. onProcessJSONData is a method is Apps.js. 
        Send all the data related to this rule up to the app.js level. */
        this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                value, this.state.output_format, window.CREATEDBY_USER ); 
        
    }

    componentDidMount()
    {
        if(this.state.createdby === window.CREATEDBY_SERVER)
        {
            console.log("RUle->componentDidMount updating information that came from server"); 
            this.props.onProcessJSONData(this.state.id, this.state.allTokenData, 
                this.state.identifier, this.state.description, this.state.polarity, 
                this.state.is_active, this.state.output_format, window.CREATEDBY_SERVER );            
        }
    }

    deleteRule()
    {
        console.log("Rule->deleteRule....."); 
        this.props.onDeleteRule(this.props.index); 
    }

    duplicate()
    {
        console.log("Rule->deleteRule....."); 
        this.props.onDuplicateRule(this.props.index); 
    }

    render() 
	{
        const tMenu = "tokenMenu" + this.state.id; 
        var msg_output_format = this.state.output_format; 
        var msg_description = this.state.description; 

        var wordTokenEditor =   <WordTokenConfig show={this.state.isWordDialogOpen}
                        onAddNewToken={this.onAddWordToken} ruleid={this.state.id}
                        onCloseConfigDialog={this.toggleWordConfigDialog}
                        modify={this.state.isModifyWord} tokenModifyIndex={this.state.tokenModifyIndex}
                        tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyWordToken={this.onModifyWordToken}>
                    </WordTokenConfig>

        
        return (
            <section>
                <div className="rulewrapper">
                
                    {/*
                    <WordConfigDialog show={this.state.isWordDialogOpen}
                    onClose={this.addNewToken}> ruleid={this.props.ruleid}
                    </WordTokenConfig>
                    */} 
                    
                    {                 
                        wordTokenEditor
                    }

                    {/*
                    <ShapeTokenConfig show={false}
                        onAddNewToken={this.addNewToken} ruleid={this.state.id}
                         onCloseWordTokenConfig={this.toggleShapeConfigDialog}>
                       
                    </ShapeTokenConfig>
                    */}

                    {
                        <PunctuationTokenConfig show={this.state.isPunctuationDialogOpen}
                            onAddNewToken={this.onAddPunctuationToken} ruleid={this.state.id}
                            onCloseConfigDialog={this.togglePunctuationConfigDialog}
                            modify={this.state.isModifyPunctuation} tokenModifyIndex={this.state.tokenModifyIndex}
                            tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyPunctuationToken={this.onModifyPunctuationToken}
                            >
                        </PunctuationTokenConfig>
                    }

                    {
                    <NumberTokenConfig show={this.state.isNumberDialogOpen}
                        onAddNumberToken={this.onAddNumberToken} ruleid={this.state.id}
                        onCloseConfigDialog={this.toggleNumberConfigDialog}
                        modify={this.state.isModifyNumbers} tokenModifyIndex={this.state.tokenModifyIndex}
                        tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyNumberToken={this.onModifyNumberToken}
                         >
                    </NumberTokenConfig>
                    }

                    {
                    <ShapeTokenConfig show={this.state.isShapeDialogOpen}
                        onAddNewToken={this.onAddShapeToken} ruleid={this.state.id}
                        onCloseConfigDialog={this.toggleShapeConfigDialog}
                        modify={this.state.isModifyShape} tokenModifyIndex={this.state.tokenModifyIndex}
                        tokenData={this.state.allTokenData[this.state.tokenModifyIndex]}
                        onModifyToken={this.onModifyShapeToken}>

                    </ShapeTokenConfig>
                    }                    


                    <div className="ruleHeader">
                        <label htmlFor={this.props.name}> {this.props.rulenum}.  </label>
                        <input
                        name="description"
                        placeholder= "Enter rule description "
                        type="text"
                        className="ruleDescription"
                        value={msg_description}
                        onChange={this.handleChange_description}
                        onBlur={this.handle_onBlur}

                        />

                    </div>

                     <div  >
                        <div id={tMenu} className="tokenMenu" >
                            <div onClick={this.showWordToken} className="tokenMenu_item"> Word </div>
                            <div onClick={this.showNumberToken} className="tokenMenu_item">Number </div> 
                            <div onClick={this.showPunctuationToken} className="tokenMenu_item">  Punctuation </div>
                            <div onClick={this.showShapeToken} className="tokenMenu_item"> Shape </div>
                        </div>   

                        <div className="arrangeRuleTokens"> 

                            <div className="arrangeEachToken"> 
                            <div  className="ruleCheckBox">
                            <input type="checkbox" defaultChecked={this.state.is_active}  name="is_active"   onChange={this.updateActiveRule}/> 
                            </div>
                            <div>
                         <button className="deletebutton" onClick={this.deleteRule}> X </button>

                            </div> 
                            </div>
                            {/*this.state.array.map((token, index) => (
                                <div className="arrangeEachToken">  {token}   </div>
                            ))*/}  
                            {this.state.array.map((token, index) => (
                               <div className="arrangeEachToken"  key={index}> <TokenWrapper data={token} index={index} key={index} onEditToken={this.onEditToken} onDeleteToken={this.deleteToken} onClickPlusToken={this.onClickPlusToken}/> </div>
                            ))}  

                        </div>

                    </div> 

        
                    <div id="ruleOutput"> 
                        Output format: 
                        <input
                        name="output_format"
                        placeholder= "e.g., {1}-{2}-{3} "
                        type="text"
                        className="output_format"
                        value={msg_output_format}
                        onChange={this.handleChange_outformat}
                        onBlur={this.handle_onBlur}
                        size="20"
                        />
                    </div> 
                    
                </div>
            </section>    
    );   
  }
}


export default Rule;