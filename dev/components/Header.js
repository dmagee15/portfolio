import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';

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
        if(store.getState().authenticated==true){
            return (
           <div id="header" style={divStyle}>
            <HoverButton float='left' text='Home' address="/"/>
            <LogoutButton float='right'/>
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
    logout = () => {
        store.dispatch(logoutUser());
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
            <button style={hoverButtonStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} onClick={this.logout}>Logout</button>
        );
    }
}

export default Header