console.log("Script started");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import Home from "./components/Home.js";

const ADD = 'ADD';

const initialState = {
    authenticated: false,
	username: '',
	location: '',
	about: '',
	tradeRequestsForYou: [],
	tradeRequests: [],
	myBooks: []
};

const add = () => {
	return {
    type: 'ADD'
  };
};

const loginUser = (user) => {
	return {
		type: 'LOGIN',
		user: user
	};
};

const logoutUser = () => {
	return {
		type: 'LOGOUT'
	};
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return Object.assign({}, state, {
        authenticated: !state.authenticated
    });
    case 'LOGIN':
        return Object.assign({}, state, {
        authenticated: true,
		username: action.user.username,
	    location: action.user.location,
	    about: action.user.about,
	    tradeRequestsForYou: action.user.tradeRequestsForYou,
	    tradeRequests: action.user.tradeRequests,
	    myBooks: action.user.myBooks
    });
    case 'LOGOUT':
        return Object.assign({}, state, {
        authenticated: false,
		username: '',
	    location: '',
	    about: '',
	    tradeRequestsForYou: [],
	    tradeRequests: [],
	    myBooks: []
    });
    default:
      return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(loginUser(user))
    },
    logoutUser: () => {
      dispatch(logoutUser())
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state
  }
}

const store = createStore(messageReducer);

// React:

class App extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
            console.log(this.props);
            return (
           <div>
            <Router>
            <div>
                <Header store={this.props}/>
                <Route exact path='/' component={Home}/>
                <Route exact path='/signup' render={(props) => (
                    <SignUp store={this.props}/>
                )} />
                <Route exact path='/login' component={Login} />
            </div>
            </Router>
          </div>
          ); 
					
   }
      
   
}

class AppTest extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){

            return (
           <div>
            <Router>
            <div>
                <Route exact path='/' component={Home2}/>
            </div>
            </Router>
          </div>
          ); 
					
   }
      
   
}

class Home2 extends React.Component{
    constructor(props) {
    super(props);
    }
    increase = () => {
        var user = {
    authenticated: true,
	username: 'Patrick',
	location: 'Houston',
	about: 'Nothing to put here.',
	tradeRequestsForYou: [],
	tradeRequests: [],
	myBooks: []
};
        console.log("GET STATE: "+store.getState().username);
        console.log("GET STATE: "+store.getState().location);
        console.log("GET STATE: "+store.getState().authenticated);
        console.log("mapstatetoprops: "+this.props.number);
        store.dispatch(loginUser(user));
        console.log("GET STATE: "+store.getState().username);
        console.log("GET STATE: "+store.getState().location);
        console.log("GET STATE: "+store.getState().authenticated);

    }
   render(){

            return (
               <div>
                    <button onClick={this.increase}>Submit</button>
               </div>
          ); 
					
   }
      
   
}

class Header extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
       var divStyle = {
					padding:0,
					width: '100%',
					height: 50,
					backgroundColor:'#F7F7F7'
					};
		var loggedStyle = {
		    float: 'right',
		    color: 'slateblue',
		    display: 'inline-block',
		    margin: '12px 40px 0px 0px',
		    fontSize: 15,
		    fontFamily: 'Arial'
		};
		var spanStyle = {
		    fontSize: 20,
		    color: 'darkslateblue',
		    fontFamily: 'Bookman',
		    fontWeight: 900
		};
        if(this.props.store.user.authenticated==true){
            return (
           <div id="header" style={divStyle}>
            <HoverButton float='left' text='Home' address="/"/>
            <LogoutButton float='right' store={this.props.store}/>
            <HoverButton float='right' text='My Profile' address="login"/>
            <HoverButton float='right' text='All Books' address="/signup"/>
            <p style={loggedStyle}>Welcome, <span style={spanStyle}>{store.getState().username}</span></p>
          </div>
          ); 
        }
        else
        {
            return (
           <div id="header" style={divStyle}>
            <HoverButton float='left' text='Home' address="/"/>
            <HoverButton float='right' text='Sign Up' address="/signup"/>
            <HoverButton float='right' text='Login' address="login"/>
          </div>
          ); 
        }
					
   }
      
   
}

class HoverButton extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        hover: false
        };
    }
    getInitialState = () => {
        return {hover: false};
    }
    
    mouseOver = () => {
        this.setState({hover: true});
    }
    
    mouseOut = () => {
        this.setState({hover: false});
    }
    
    
    
    render() {
        
        var hoverButtonStyle = {
		    height: '100%',
		    color: 'black',
		    float: this.props.float,
		    background: this.state.hover?'lightblue':'none',
            border:'none',
            margin: '0px 20px 0px 20px'
		};
    
        return(
            <Link to={this.props.address}><button style={hoverButtonStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>{this.props.text}</button></Link>
        );
    }
}

class LogoutButton extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        hover: false
        };
    }
    getInitialState = () => {
        return {hover: false};
    }
    
    mouseOver = () => {
        this.setState({hover: true});
    }
    
    mouseOut = () => {
        this.setState({hover: false});
    }
    logout = (history) => {
        fetch('/logout', {
        method: 'GET',
        credentials: 'include'
        }).then(() => {
            this.props.store.logoutUser();
            history.push('/');
        })
    }
    
    
    render() {
        
        var hoverButtonStyle = {
		    height: '100%',
		    color: 'black',
		    float: this.props.float,
		    background: this.state.hover?'lightblue':'none',
            border:'none',
            margin: '0px 20px 0px 20px'
		};
    
        return(
            <Route render={({ history}) => (
                <button style={hoverButtonStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={() => this.logout(history)}>Logout</button>
            )} />
        );
    }
}

class SignUp extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        usernameInput: '',
        passwordInput: '',
        emailInput: '',
        redirect: false
        };
    }
    createAccount = (history) => {
        
        fetch('/createnewuser', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"username":this.state.usernameInput,
            "password":this.state.passwordInput,
            "email":this.state.emailInput
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log('pushing to homepage');
            console.log(j);
            console.log("login status: "+store.getState().authenticated);
            this.props.store.loginUser(j);
            console.log("login status: "+store.getState().authenticated);
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
		const { redirect } = this.state;
        
        if(redirect){
            return <Redirect to='/'/>;
        }
        
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
                    <Route render={({ history}) => (
                        <button onClick={() => this.createAccount(history)} style={buttonStyle}>Create Account</button>
                    )} />
                </div>
          </div>
          ); 
        	
   }
}

class Login extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        usernameInput: '',
        passwordInput: ''
        };
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
        

            return (
           <div style={divStyle}>
                <h1 style={hStyle}>Login</h1>
                <div style={innerDivStyle}>
                    <h3 style={pStyle}>Username</h3>
                    <input style={inputStyle} type="text" value={this.state.usernameInput} onChange={this.handleUsernameChange}/>
                    <h3 style={pStyle}>Password</h3>
                    <input style={inputStyle} type="text" value={this.state.passwordInput} onChange={this.handlePasswordChange}/>
                    <button style={buttonStyle}>Login</button>
                </div>
          </div>
          ); 
					
   }
      
   
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

const Button = () => (
  <Route render={({ history}) => (
    <button
      type='button'
      onClick={() => { history.push('/') }}
    >
      Click Me!
    </button>
  )} />
)



const AppWrapper = ({ store }) => (
  <Provider store={store}>
      <Container />
  </Provider>
);

ReactDOM.render(
        <AppWrapper store={store}/>,
    document.querySelector("#container")
    );
    
console.log("script ended");