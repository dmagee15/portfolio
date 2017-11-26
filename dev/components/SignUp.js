import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';

class SignUp extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        usernameInput: '',
        passwordInput: '',
        emailInput: '',
        cityInput: '',
        stateInput: '',
        fullNameInput: ''
        };
    }
    createAccount = (history) => {
        
        fetch('/createnewuser', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"username":this.state.usernameInput,
            "password":this.state.passwordInput,
            "email":this.state.emailInput,
            "city":this.state.cityInput,
            "state":this.state.stateInput,
            "fullName":this.state.fullNameInput
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log('pushing to homepage');
            console.log(j);
            this.props.store.loginUser(j);
            console.log(this.props);
            history.push('/');
        });

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
    handleCityChange = (event) => {
        this.setState({
            cityInput: event.target.value
        });
    }
    handleStateChange = (event) => {
        this.setState({
            stateInput: event.target.value
        });
    }
    handleFullNameChange = (event) => {
        this.setState({
            fullNameInput: event.target.value
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
		var inputCityStyle = {
					padding:0,
					width: '100%',
					height:25,
					display:'inline-block'
					};
		var inputStateStyle = {
					padding:0,
					width: '100%',
					height:25,
					display:'inline-block',
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
		var pCityStyle = {
		    padding: '5px 0px 5px 0px',
		    margin:0,
		    fontFamily:'Arial',
		};
		var pStateStyle = {
		    padding: '5px 0px 5px 0px',
		    margin:0,
		    fontFamily:'Arial',
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
		var divCityStyle = {
		    width:'45%',
		    display:'inline-block'
		};
		var divStateStyle = {
		    width:'45%',
		    display:'inline-block'
		};
		var blankStyle = {
		    width:'10%',
		    display:'inline-block'
		};
        
        return (
           <div style={divStyle}>
                <h1 style={hStyle}>Sign Up</h1>
                <div style={innerDivStyle}>
                    <h3 style={pStyle}>Username</h3>
                    <input style={inputStyle} type="text" value={this.state.usernameInput} onChange={this.handleUsernameChange}/>
                    <h3 style={pStyle}>Password</h3>
                    <input style={inputStyle} type="text" value={this.state.passwordInput} onChange={this.handlePasswordChange}/>
                    <h3 style={pStyle}>Full Name</h3>
                    <input style={inputStyle} type="text" value={this.state.fullNameInput} onChange={this.handleFullNameChange}/>
                    <h3 style={pStyle}>Email</h3>
                    <input style={inputStyle} type="text" value={this.state.emailInput} onChange={this.handleEmailChange}/>
                    <div style={divCityStyle}>
                        <h3 style={pCityStyle}>City</h3>
                        <input style={inputCityStyle} type="text" value={this.state.cityInput} onChange={this.handleCityChange}/>
                    </div>
                    <div style={blankStyle}>
                    </div>
                    <div style={divStateStyle}>
                        <h3 style={pStateStyle}>State</h3>
                        <input style={inputStateStyle} type="text" value={this.state.stateInput} onChange={this.handleStateChange}/>
                    </div>
                    <Route render={({ history}) => (
                        <button onClick={() => this.createAccount(history)} style={buttonStyle}>Create Account</button>
                    )} />
                </div>
          </div>
          ); 
        	
   }
}

export default SignUp