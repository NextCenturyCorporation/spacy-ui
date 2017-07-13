import React from 'react';
import "../Styles/wordtoken.css"

class NumberTokenConfig extends React.Component {
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
      allnumbers:"",
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
    this.checkInput = this.checkInput.bind(this); 
    this.cancelDialog = this.cancelDialog.bind(this); 

    //console.log("NumberTokenConfig = ruleid"+this.props.ruleid); 

  }

  componentWillMount() 
  {
    //alert("NumberTokenConfig id="+this.props.ruleid); 
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
    //alert("createNewToken Rule id = " + this.props.ruleid); 
    this.props.onAddNumberToken("#","numbers", this.state.allwords.split(" "), this.state.optional, 
        this.state.part_of_output,this.state.followed_by_space, this.state.length1, this.state.length2, this.state.length3,
        this.state.prefix,this.state.suffix, this.state.notinvocabulary,
        this.state.noun, this.state.pronoun,this.state.punctuation, 
        this.state.propernoun, this.state.determiner, this.state.symbol, 
        this.state.adjective, this.state.conjunction, this.state.verb,
        this.state.prepost_position, this.state.adverb, this.state.particle,
        this.state.interjection,this.state.exact,this.state.lower,
        this.state.upper, this.state.title, this.state.mixed,this.state.allnumbers.split(" ")        
    )
  }

  checkInput(event) 
  {
    var invalidcharacters = /[^0-9]/gi
    var phn = document.getElementById('textarea');
    if (invalidcharacters.test(phn.value)) {
       var  newstring = phn.value.replace(invalidcharacters, "");
        phn.value = newstring
    }
  }

  cancelDialog()
  {
    this.props.onCloseConfigDialog(); 
  }


  render() {
    //alert("render called")
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }
    
   //alert("NumberTokenConfig id="+this.props.ruleid); 

    return (
      <div className="backdrop" >
        <form onSubmit={this.handleSubmit} className="number-modal">
          {this.props.children}

          <div className="number-modal-header">Number Token </div>

          <div className="modal-body">
            <div id="number-div1">
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

            <div id="number-div2">

              <div id="number-div21"> 
                <label>
                  <b>Numbers:</b>
                  <textarea name="allnumbers" value={this.state.allnumbers} onChange={this.handleInputChange}  rows="10" cols="10"  className="allwords"/>
                </label>
              </div> 

              <div id="number-div22">

                <div id="number-lengths">
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


                <div id="number-prefix-suffix">
                <label>
                Prefix: 
                <input name="prefix" type="text" value={this.state.prefix} onChange={this.handleInputChange}   size="50" className="num_prefixsuffix" />
              </label> 

              <label>
                Suffix: 
                <input name="suffix" type="text" value={this.state.suffix} onChange={this.handleInputChange}  size="50" />
              </label> 
                                                   
                </div> 
              </div> 
            </div>

          </div>

          <div id="numbertoken-footer">
            <button onClick={this.cancelDialog} className="button">
              cancel
                </button>
            <button onClick={this.createNewToken} className="button" >
              Save
                </button>
          </div>
        </form>
      </div>
    );
  }
}

NumberTokenConfig.propTypes = {
  //onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
};

export default NumberTokenConfig;