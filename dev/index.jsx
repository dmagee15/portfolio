console.log("Script started");

import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component{
    constructor(props) {
    super(props);
    }
    
   render(){
       var divStyle = {
					margin:'auto',
					padding:0,
					width: '100%',
					height: 400,
					borderColor: 'black',
					borderWidth: 1,
					borderStyle: 'solid',
					textAlign: 'center'
					};

					
        

            return (
           <div>
            <Header/>
            <Home/>
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
            <HoverButton float='left' text='Home'/>
            <HoverButton float='right' text='Sign Up'/>
            <HoverButton float='right' text='Login'/>
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
                width:180,
                display:'inline-block',
                margin: '50px 100px 0px 100px',
                verticalAlign: 'top',
                textAlign: 'left'
            };
            return (
               <div style={{textAlign:'center'}}>
                    <div style={infoBoxStyle}>
                        <h1>Browse Catalogue</h1>
                        <p>Look through the catalogue to see which books our users own and see which ones you would be interested in reading.</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1>Exchange Books</h1>
                        <p>Post books that you own that you would be interested in exchanging with other reader's books.</p>
                    </div>
                    <div style={infoBoxStyle}>
                        <h1>Personal Homepage</h1>
                        <p>Maintain your public profile, manage your trades, and update your personal catalogue.</p>
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
            <button style={hoverButtonStyle} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>{this.props.text}</button>
        );
    }
}



ReactDOM.render(
        <App/>,
    document.querySelector("#container")
    );
    
console.log("script ended");