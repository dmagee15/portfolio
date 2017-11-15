import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';

class Profile extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        searchInput: '',
        myBooksArray: [],
        passwordInput: '',
        emailInput: '',
        };
    }
    findBook = () => {
        
        fetch('/findbook', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"searchInput":this.state.searchInput,
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log(j);
            var myBooksArray = [...this.state.myBooksArray, {title: j.title, thumbnail:j.thumbnail}];
            this.setState({myBooksArray});


        });

    }
    handleSearchChange = (event) => {
        this.setState({
            searchInput: event.target.value
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
					width: '75%',
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
		var searchInputStyle = {
		    padding:0,
			width: 250,
			height:25,
			display: 'inline-block',
			margin: "15px 0px 0px 0px"
		};
		var searchButtonStyle = {
		    background: 'lightblue',
		    height: 25,
		    border:'none',
		    boxShadow:'none',
		    fontSize: 18,
		    fontFamily: 'Arial',
		    borderRadius: 2,
		    display: 'inline-block',
		    margin: "15px 0px 0px 10px"
		}
		var myBooksStyle = {
		    width: '100%',
		    minHeight: 200,
		    border: '1px solid black',
		    margin: '20px 0 20px 0'
		};
		var booksDisplay = this.state.myBooksArray.map((book, index) => 
		   <BookAdded key={index} image={book.thumbnail} title={book.title}/>
		);
		

        return (
           <div style={divStyle}>
                <h1 style={hStyle}>Profile</h1>
                <div style={innerDivStyle}>
                    <h3 style={pStyle}>My Books</h3>
                    <input style={searchInputStyle} type="text" value={this.state.searchInput} onChange={this.handleSearchChange}/>
                    <button style={searchButtonStyle} onClick={this.findBook}>Add Book</button>
                    <div style={myBooksStyle}>
                        {booksDisplay}
                    </div>
                    
                </div>
          </div>
          ); 
        	
   }
}

class BookAdded extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){

        var thumbnailStyle = {
            height: 150,
            background: "url('"+this.props.image+"')",
            backgroundSize: 'cover',
            display: 'inline-block'
        }
        var titleStyle = {
            display: 'inline-block',
            width:100
        }
        var divStyle = {
            display: 'inline-block',
            width: 100,
            margin: "10px 25px 10px 25px",
            verticalAlign: 'top'
        }
        var imgStyle = {
            height: 150
        }
        
        return (
            <div style={divStyle}>
                <div style={thumbnailStyle}>
                    <img style={imgStyle} src={this.props.image}/>
                </div>
                <p style={titleStyle}>{this.props.title}</p>
            </div>
            );
    }
}

export default Profile