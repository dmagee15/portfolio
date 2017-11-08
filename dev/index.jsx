console.log("Script started");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';

class App extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){

            return (
           <div>
            <Router>
            <div>
                <Header/>
                <Route exact path='/' component={Home}/>
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/login' component={Login} />
            </div>
            </Router>
          </div>
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
        body: JSON.stringify({"username":this.state.usernameInput,
            "password":this.state.passwordInput,
            "email":this.state.emailInput
        })
        }).then((response) => {
            console.log('pushing to homepage');
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

        

            return (
           <div id="header" style={divStyle}>
            <HoverButton float='left' text='Home' address="/"/>
            <HoverButton float='right' text='Sign Up' address="/signup"/>
            <HoverButton float='right' text='Login' address="login"/>
          </div>
          ); 
					
   }
      
   
}

class Home extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){

            return (
               <div>
                    <HomeMain/>
                    <HomeInfo/>
                    <ProjectInfo/>
               </div>
          ); 
					
   }
      
   
}

class HomeMain extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
    var divStyle = {
					padding:0,
					width: '100%',
					minHeight: 210,
					background:'url(/output/priscilla-du-preez-293218.jpg)',
					backgroundPosition: 'center bottom',
					backgroundSize: 'cover',
					textAlign: 'center',
					overflow: 'hidden'
					};
	var divStyleOverlay = {
	                padding:0,
					width: '100%',
					minHeight: 210,
					background:'rgba(1,1,1,.5)',
					overflow: 'hidden'
	                };
	var titleStyle = {
					color: 'white',
					fontSize: 80,
					paddingTop: 20,
					margin: 0
					};
	var hrStyle = {
	    width: 700,
	    borderColor: 'white'
	};
	var subtitleStyle = {
					color: 'white',
					fontSize: 20,
					paddingTop: 10,
					margin: 0,
					fontFamily: 'Lucida Console'
					};
            return (
               <div style={divStyle}>
               <div style={divStyleOverlay}>
                    <h1 style={titleStyle}>Book Trading Club</h1>
                    <hr style={hrStyle}/>
                    <p style={subtitleStyle}>Trade your used books with other readers</p>
                </div>
               </div>
          ); 
					
   }
      
   
}

class HomeInfo extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
            
            var infoBoxStyle = {
                width:300,
                display:'inline-block',
                margin: '50px 50px 0px 50px',
                verticalAlign: 'top',
                textAlign: 'left'
            };
            var pStyle = {
                fontFamily: 'Arial',
                color: '#797979'
            };
            var hStyle = {
                color: '#5C0700',
                marginBottom:0
            };
            var hrStyle = {
                width: 280,
                color: 'gray',
                float: 'left'
            };
            return (
               <div style={{textAlign:'center', minHeight:300}}>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Browse Catalogue</h1>
                        <hr style={hrStyle}/>
                        <p style={pStyle}>Look through the catalogue to see which books our users own and see which ones you would be interested in reading.</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Exchange Books</h1>
                        <hr style={hrStyle}/>
                        <p style={pStyle}>Post books that you own that you would be interested in exchanging with other reader's books.</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Personal Homepage</h1>
                        <hr style={hrStyle}/>
                        <p style={pStyle}>Maintain your public profile, manage your trades, and update your personal catalogue.</p>
                    </div>
               </div>
          ); 
					
   }
      
   
}

class ProjectInfo extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
            var divStyle = {
                backgroundColor: 'gray',
                width:'100%',
                minHeight:300,
                textAlign:'center'
                };
            var infoBoxStyle = {
                width:300,
                display:'inline-block',
                margin: '50px 50px 0px 50px',
                verticalAlign: 'top',
                textAlign: 'left',
                padding: '0px 0px 20px 30px',
                borderLeft:'2px solid black'
            };
            var pStyle = {
                fontFamily: 'Arial',
                color: '#E0E0E0'
            };
            var hStyle = {
                color: 'white',
                marginBottom:0
            };
            return (
               <div style={divStyle}>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Background</h1>
                        <p style={pStyle}>This book trading club app is a</p>
                        <p style={pStyle}>FreeCodeCamp full-stack project</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Technologies</h1>
                        <p style={pStyle}>Front-end: React, React Router</p>
                        <p style={pStyle}>Back-end: Express.js, Mongoose</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1 style={hStyle}>Author</h1>
                        <p style={pStyle}>David Magee is a web developer in</p>
                        <p style={pStyle}>Houston, TX</p>
                    </div>
               </div>
          ); 
					
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



ReactDOM.render(
        <App/>,
    document.querySelector("#container")
    );
    
console.log("script ended");