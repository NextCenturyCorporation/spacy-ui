import React from 'react';
import "../Styles/wordtoken.css"
import Token from "./Token"; 

var GLOBAL_ID = 1; 
var TOKEN_BASE = 9000; 
var PTOKEN_BASE = 8000; 
class WordTokenConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optional: false,
      part_of_output: false,
      followed_by_space: false,
      length1:"",
      length2:"",
      length3:"",
      prefix:"",
      suffix:"",
      notinvocabulary: false,
      allwords:"",
      noun:false, 
      pronoun:false, 
      punctuation:false,
      propernoun: false,
      determiner: false, 
      symbol: false,
      adjective: false,
      conjunction: false,
      verb: false, 
      prepost_position: false,
      adverb: false, 
      particle: false, 
      interjection: false,
      exact: false, 
      lower: false, 
      upper: false, 
      title: false, 
      mixed: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNewToken = this.createNewToken.bind(this); 
  }

  handleInputChange(event) 
  {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    //alert("You clicked on " + name); 

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }



  /* 
  Method used to create new token
  */
  createNewToken()
  {

    this.props.onAddNewToken("W","word", this.state.allwords.split(" "), this.state.optional, 
        this.state.part_of_output,this.state.followed_by_space, this.state.length1, this.state.length2, this.state.length3,
        this.state.prefix,this.state.suffix, this.state.notinvocabulary,
        this.state.noun, this.state.pronoun,this.state.punctuation, 
        this.state.propernoun, this.state.determiner, this.state.symbol, 
        this.state.adjective, this.state.conjunction, this.state.verb,
        this.state.prepost_position, this.state.adverb, this.state.particle,
        this.state.interjection,this.state.exact,this.state.lower,
        this.state.upper, this.state.title, this.state.mixed        
    )
  }


  render() {
    //alert("render called")
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" >
        <form onSubmit={this.handleSubmit} className="modal">
          {this.props.children}

          <div className="modal-header">Word Token </div>

          <div id="modal-body">
            <div id="div1">
              <label>
                <input name="optional" type="checkbox" checked={this.state.optional} onChange={this.handleInputChange} className="wordlabels" />
                optional
                </label>

              <label>
                <input name="part_of_output" type="checkbox" checked={this.state.part_of_output} onChange={this.handleInputChange} className="wordlabels" />
                part of output
                </label>

              <label>
                <input name="followed_by_space" type="checkbox" checked={this.state.followed_by_space} onChange={this.handleInputChange} className="wordlabels" />
                followed by space
                </label>
            </div>

            <div id="div2">

              <div id="div21"> 
                <label>
                  <b>Words:</b>
                  <textarea name="allwords" value={this.state.allwords} onChange={this.handleInputChange} rows="15" cols="10"  className="allwords"/>
                </label>
              </div> 

              <div id="div22">
                <div id="partofspeech">
                  <b>Part of speech: </b>
                </div>
                <div id="partofspeech_1">
                    <label className="inspeech">
                      <input name="noun" type="checkbox" checked={this.state.noun} onChange={this.handleInputChange}  className="wordlabels" />
                      noun
                    </label>    

                    <label className="inspeech">
                      <input name="pronoun" type="checkbox" checked={this.state.pronoun} onChange={this.handleInputChange} className="wordlabels" />
                      pronoun
                    </label> 

                    <label className="inspeech">
                      <input name="punctuation" type="checkbox" checked={this.state.punctuation} onChange={this.handleInputChange} className="wordlabels" />
                      punctuation
                    </label> 

                    <label className="inspeech">
                      <input name="propernoun" type="checkbox" checked={this.state.propernoun} onChange={this.handleInputChange} className="wordlabels" />
                      proper noun
                    </label> 

                    <label className="inspeech">
                      <input name="determiner" type="checkbox" checked={this.state.determiner} onChange={this.handleInputChange} className="wordlabels" />
                      determiner
                    </label> 

                    <label className="inspeech">
                      <input name="symbol" type="checkbox" checked={this.state.symbol} onChange={this.handleInputChange} className="wordlabels" />
                      symbol
                    </label>        

                    <label className="inspeech">   
                      <input name="adjective" type="checkbox" checked={this.state.adjective} onChange={this.handleInputChange} className="wordlabels" />
                      adjective
                    </label>      

                </div>
                <div id="partofspeech_2">
         

                    <label className="inspeech">
                      <input name="conjunction" type="checkbox" checked={this.state.conjunction} onChange={this.handleInputChange} className="wordlabels" />
                      conjunction
                    </label>                     

                    <label className="inspeech">
                      <input name="verb" type="checkbox" checked={this.state.verb} onChange={this.handleInputChange} className="wordlabels" />
                      verb
                    </label>                     

                    <label className="inspeech">
                      <input name="prepost_position" type="checkbox" checked={this.state.prepost_position} onChange={this.handleInputChange} className="wordlabels" />
                      pre/post-position
                    </label>                     

                    <label className="inspeech">
                      <input name="adverb" type="checkbox" checked={this.state.adverb} onChange={this.handleInputChange} className="wordlabels" />
                      adverb
                    </label>                     

                    <label className="inspeech">
                      <input name="particle" type="checkbox" checked={this.state.particle} onChange={this.handleInputChange} className="wordlabels" />
                      particle
                    </label>                     

                    <label className="inspeech">
                      <input name="interjection" type="checkbox" checked={this.state.interjection} onChange={this.handleInputChange} className="wordlabels" />
                      interjection
                    </label>                       
                </div>
                <div id="">
                <b>Capitalization: </b>
                </div>
                <div id="capitalization">
                  <label>
                    <input name="exact" type="checkbox" checked={this.state.exact} onChange={this.handleInputChange} className="wordlabels" />
                    exact
                  </label>      
                  <label>
                    <input name="lower" type="checkbox" checked={this.state.lower} onChange={this.handleInputChange} className="wordlabels" />
                    lower
                  </label>   
                  <label>
                    <input name="upper" type="checkbox" checked={this.state.upper} onChange={this.handleInputChange} className="wordlabels" />
                    upper
                  </label>   
                  <label>
                    <input name="title" type="checkbox" checked={this.state.title} onChange={this.handleInputChange} className="wordlabels" />
                    title
                  </label>             
                  <label>
                    <input name="mixed" type="checkbox" checked={this.state.mixed} onChange={this.handleInputChange} className="wordlabels" />
                    mixed
                  </label>                                                                           
                </div> 
              </div> 
            </div>

            <div id="div3">
              <label>
                Length 1:
                <input name="length1" type="checkbox" checked={this.state.length1} onChange={this.handleInputChange} className="wordlabels2" />
                </label>

              <label>
                Length 2: 
                <input name="length2" type="checkbox" checked={this.state.length2} onChange={this.handleInputChange} className="wordlabels2" />
                </label>

              <label>
                Length 3
                <input name="length3" type="checkbox" checked={this.state.length3} onChange={this.handleInputChange} className="wordlabels2" />
                </label>              
            </div> 
          </div>

          <div id="div4">
            <div id="div41">
              <label>
                Prefix: 
                <input name="prefix" type="text" value={this.state.prefix} onChange={this.handleInputChange} size="10" className="wordlabels2" />
              </label> 

              <label>
                Suffix: 
                <input name="suffix" type="text" value={this.state.suffix} onChange={this.handleInputChange} size="10" className="wordlabels2" />
              </label> 

              <label>
                <input name="notinvocabulary" type="checkbox" checked={this.state.notinvocabulary} onChange={this.handleInputChange} className="wordlabels" />
                not in vocabulary
                </label>

            </div> 
          </div> 

          <div id="footer" align="right">
            <button onClick={this.props.onClick}>
              cancel
                </button>
            <button onClick={this.createNewToken}>
              Save
                </button>
          </div>
        </form>
      </div>
    );
  }
}

WordTokenConfig.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
};

export default WordTokenConfig;