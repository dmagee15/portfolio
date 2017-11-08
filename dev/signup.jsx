import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute} from 'react-router-dom';

class SignUp extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        usernameInput: '',
        passwordInput: '',
        emailInput: ''
        };
    }
    createAccount = () => {
        var formData = new FormData();

        formData.append("username", this.state.usernameInput);
        formData.append("password", this.state.passwordInput);
        
        fetch('/createnewuser', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"username":this.state.usernameInput,
            "password":this.state.passwordInput,
            "email":this.state.emailInput
        })
        }).then(function(response) {
            console.log('pushing to homepage');
            this.props.history.push('/');
        });
        {/*.then(function(response) {
        return response.json();
        }).then(function(json) {
        console.log('parsed json', json);
        }).catch(function(ex) {
        console.log('parsing failed', ex);
        });*/}
    }
    handleUsernameChange = (event) => {
        this.setState({
            usernameInput: event.target.value
        });
    }
    handlePasswordChange = (event) => {
        this.setState({
            passwordInput: event.target.value
        });
    }
    handleEmailChange = (event) => {
        this.setState({
            emailInput: event.target.value
        });
    }
   render(){
       var divStyle = {
					padding:0,
					width: '100%',
					textAlign:'center'
					};
		var innerDivStyle = {
					width: '50%',
					textAlign:'left',
					margin: 'auto',
					padding: '0px 0px 30px 40px',
					borderLeft:'3px solid gray'
					};
		var inputStyle = {
					padding:0,
					width: '100%',
					height:25
					};
		var hrStyle = {
		    width:'70%',
		    height:0,
		    borderColor:'gray'
		};
		var hStyle = {
		    fontSize: 40,
		    fontFamily:'Arial'
		};
		var pStyle = {
		    padding: '5px 0px 5px 0px',
		    margin:0,
		    fontFamily:'Arial'
		};
		var buttonStyle = {
		    background: 'lightblue',
		    border:'none',
		    borderRadius: 5,
		    boxShadow:'none',
		    margin: '20px 0px 0px 0px',
		    fontSize: 18,
		    fontFamily: 'Arial',
		    padding: '10px 10px 10px 10px'
		};
        

            return (
           <div style={divStyle}>
                <h1 style={hStyle}>Sign Up</h1>
                <div style={innerDivStyle}>
                    <h3 style={pStyle}>Username</h3>
                    <input style={inputStyle} type="text" value={this.state.usernameInput} onChange={this.handleUsernameChange}/>
                    <h3 style={pStyle}>Password</h3>
                    <input style={inputStyle} type="text" value={this.state.passwordInput} onChange={this.handlePasswordChange}/>
                    <h3 style={pStyle}>Email</h3>
                    <input style={inputStyle} type="text" value={this.state.emailInput} onChange={this.handleEmailChange}/>
                    <button onClick={this.createAccount} style={buttonStyle}>Create Account</button>
                </div>
          </div>
          ); 
					
   }
}

export default withRouter(SignUp);