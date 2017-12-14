import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';

class Login extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        usernameInput: '',
        passwordInput: '',
        fail: 'false'
        };
    }
    loginAccount = (history) => {
        
        fetch('/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"username":this.state.usernameInput,
            "password":this.state.passwordInput
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log('pushing to homepage');
            if(Object.keys(j).length === 0){
                console.log('fail');
                this.setState({fail:true});
            }
            else{
                console.log(j);
                this.props.store.loginUser(j);
                console.log(this.props);
                history.push('/');
            }

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
		var failStyle = {
		    color: 'red',
		    display:'inline-block',
		    fontSize: 14
		};
        

            return (
           <div style={divStyle}>
                <h1 style={hStyle}>Login</h1>
                <div style={innerDivStyle}>
                    {(this.state.fail==true)?(
                        <h3 style={pStyle}>Username  <span style={failStyle}>Username and password do not match.</span></h3>
                    ):(
                        <h3 style={pStyle}>Username</h3>
                    )}
                    <input style={inputStyle} type="text" value={this.state.usernameInput} onChange={this.handleUsernameChange}/>
                    <h3 style={pStyle}>Password</h3>
                    <input style={inputStyle} type="text" type="password" value={this.state.passwordInput} onChange={this.handlePasswordChange}/>
                    <Route render={({ history}) => (
                        <button onClick={() => this.loginAccount(history)} style={buttonStyle}>Login</button>
                    )} />
                </div>
          </div>
          ); 
					
   }
      
   
}

export default Login