console.log("Script started");

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Link, IndexRoute } from 'react-router-dom';

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
                <Route exact path='/signup' component={ProjectInfo} />
            </div>
            </Router>
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
					borderColor: 'black',
					borderWidth: 1,
					borderStyle: 'solid',
					};

		var leftButtonStyle = {
		    height: '100%',
		    color: 'black',
		    float: 'left',
		    background:'none',
            border:'none'
		};
		
		var rightButtonStyle = {
		    height: '100%',
		    color: 'black',
		    float: 'right',
		    background:'none',
            border:'none'
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
					height: 210,
					background:'url(/output/priscilla-du-preez-293218.jpg)',
					backgroundPosition: 'center bottom',
					backgroundSize: 'cover',
					textAlign: 'center',
					overflow: 'hidden'
					};
	var divStyleOverlay = {
	                padding:0,
					width: '100%',
					height: 210,
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
               <div style={{textAlign:'center', height:300}}>
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
                height:300,
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