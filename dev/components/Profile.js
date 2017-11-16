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
            var myBooksArray = [...this.state.myBooksArray, {title: j.title, thumbnail:j.thumbnail, author:j.authors[0], publishedDate:j.publishedDate}];
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
					padding: '0px 0px 30px 0px'
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
		   <BookAdded key={index} book={book} />
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
            height: 230,
            width: '100%',
            display: 'inline-block',
            overflow: 'hidden',
            margin: 0,
            padding: 0
        }
        var titleStyle = {
            display: 'inline-block',
            width:'100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            fontFamily: 'Arial'
        }
        var divStyle = {
            display: 'inline-block',
            width: 220,
            margin: "10px 25px 10px 25px",
            padding:0,
            verticalAlign: 'top',
            boxShadow: '3px 3px 2px 2px #888888',
            overflow: 'hidden',
            overflowX: 'hidden'
        }
        var imgStyle = {
            width: 220,
            height: 230,
            background: "url('"+this.props.book.thumbnail+"')",
            backgroundSize: 'cover',
            display:'inline-block'
        }
        var divContentStyle = {
            width: '100%',
            margin: 0,
            padding: 0
        }
        var subtextStyle = {
            color: '#D8D8D8',
            margin: 0,
            padding: 0
        };
        var buttonDiv = {
            height: 70,
            width: '100%',
            margin: 0,
            padding: 0
        }
        var removeButtonStyle = {
            display: 'inline-block',
            backgroundColor: 'black',
            color: 'white',
            height: 40,
            padding:'0px 8px 0px 8px',
            margin:0,
            border: 'none',
            margin: '15px 0 0 10px',
            fontFamily: 'Tahoma',
            fontSize: 18,
            fontWeight: 900
        };
        var infoButtonStyle = {
            display: 'inline-block',
            backgroundColor: 'lightblue',
            color: 'black',
            height: 40,
            padding:'0px 8px 0px 8px',
            margin:0,
            border: 'none',
            margin: '15px 0 0 5px',
            fontFamily: 'Tahoma',
            fontSize: 18,
            fontWeight: 900
        };
        
        return (
            <div style={divStyle}>
                <div style={thumbnailStyle}>
                    <div style={imgStyle}>
                    </div>
                </div>
                <div style={divContentStyle}>
                    <h3 style={titleStyle}>{this.props.book.title}</h3>
                    <p style={subtextStyle}>Author: {this.props.book.author}</p>
                    <p style={subtextStyle}>Year: {this.props.book.publishedDate}</p>
                </div>
                <div style={buttonDiv}>
                    <button style={removeButtonStyle}>Remove</button>
                    <button style={infoButtonStyle}>Book Info</button>
                </div>
            </div>
            );
    }
}

export default Profile