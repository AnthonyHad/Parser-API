import React, { Component } from 'react';

// Importing Components
import MoleculeList from './moleculeList'
import Background from './background'

// Importing from the framer-motion package
import { motion } from 'framer-motion'

// Importing respective CSS stylesheet
import '../stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      clicked: false,
      message:'',
      userInput: ''
    }
  }

  // Tracking the user input as he types
  handleChange = (event) => {
    event.preventDefault();
    this.setState({value: event.target.value, clicked: false})
  }

  // Sending post request to Api on button click
  handleClick = (event) => {
    event.preventDefault();
    const value = this.state.value;
    this.setState({userInput: value})
    const url = "/molecule/parse"

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ molecule: value })
      }

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data =>{
           this.setState({value: data.molecule, clicked: true, message: data.message})
        });
    }

  render(){
    return (
      <body>
        < Background />
          <motion.div className="wrapper"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.5, duration: 0.8, type: 'tween', stiffness: 200}}
          >
            <div className="wrapper-text">
              <div>
                <h1> Molecule Parser 4.0 </h1>
              </div>
              <div>
                <h4> A typical molecule would be: "H2O" or "K2[SO3]2"</h4>
              </div>
            <div>
              <form className="form-global" >
                <p><input type="text" placeholder="Your Molecule" onChange= {this.handleChange} className="form-input" /></p>
                <p><button onClick= {this.handleClick} className="button">Decompose!</button></p>
              </form>
              <div><p> {this.state.clicked ? `Your input: ${this.state.userInput}` : ""}</p></div>
              <div className="parsed-molecule">
                {this.state.clicked ? <MoleculeList molecule={this.state.value} userInput = {this.state.userInput} /> : "Let's parse this molecule!"}
              </div>
            </div>
          </div>
        </motion.div>
      </body>
    )
  }
}

export default App;
