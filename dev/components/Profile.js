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
        showInfo: false,
        showInfoBook: ''
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
            var myBooksArray = [...this.state.myBooksArray, {title: j.title, thumbnail:j.thumbnail, author:j.authors[0], publishedDate:j.publishedDate, description:j.description, pageCount:j.pageCount}];
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
    showInfoWindow = (book) => {
        console.log("info window");
        console.log(book);
        this.setState({showInfo: true, showInfoBook: book});
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
		    margin: '20px 0 20px 0'
		};
		var hrStyle = {
		    borderColor:'#F2F2F2',
		    width: '100%'
		}
		var booksDisplay = this.state.myBooksArray.map((book, index) => 
		   <BookAdded key={index} book={book} showInfoWindow={this.showInfoWindow}/>
		);
		

        return (
           <div style={divStyle}>
                <h1 style={hStyle}>Profile</h1>
                <div style={innerDivStyle}>
                    <hr style={hrStyle}/>
                    <h3 style={pStyle}>My Books</h3>
                    <input style={searchInputStyle} type="text" value={this.state.searchInput} onChange={this.handleSearchChange}/>
                    <button style={searchButtonStyle} onClick={this.findBook}>Add Book</button>
                    <div style={myBooksStyle}>
                        {booksDisplay}
                    </div>
                    <hr style={hrStyle}/>
                </div>
                <BookInfoBox showInfo={this.state.showInfo} book={this.state.showInfoBook}/>
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
                    <button style={infoButtonStyle} onClick={() => {this.props.showInfoWindow(this.props.book)}}>Book Info</button>
                </div>
            </div>
            );
    }
}

class BookInfoBox extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){
    
    if(!this.props.showInfo){
        return null;
    }
    
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      width: 650,
      height: 500,
      margin: 0,
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'left'
    };
    
    var bookCoverStyle = {
        display:'inline-block',
        height: 500,
        width: 325,
        margin: 0,
        overflow: 'hidden'
    };
    var contentStyle = {
        display:'inline-block',
        height:500,
        width: 310,
        paddingLeft: 15,
        margin: 0,
        overflow: 'hidden'
    };
    var imgStyle = {
            width: 300,
            height: 480,
            background: "url(https://books.google.com/books/content?id=iO5pApw2JycC&printsec=frontcover&img)",
            backgroundSize: 'cover',
            display:'inline-block',
            margin: "10px 12px 10px 12px"
        };
        var titleStyle = {
            display: 'inline-block',
            width:'100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            margin: 'auto',
            padding: '0 0 15px 0',
            fontFamily: 'Arial',
            fontWeight: 900
        };
        var subtextStyle = {
            color: '#D8D8D8',
            margin: 0,
            padding: '0 0 10px 0',
        };
        var synopsisStyle = {
            color: '#D8D8D8',
            margin: 0,
            padding: 0
        }
        var subtitleStyle = {
            color: '#A5A5A5',
            fontWeight: 700,
            padding: 0,
            margin: 0
        }
        
        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    <div style={bookCoverStyle}>
                        <div style={imgStyle}>
                        </div>
                    </div>
                    <div style={contentStyle}>
                        <h3 style={titleStyle}>Harry Potter and the Prisoner</h3>
                        <p style={subtextStyle}><span style={subtitleStyle}>Synopsis</span>: </p>
                        <p style={subtextStyle}><span style={subtitleStyle}>Author</span>: </p>
                        <p style={subtextStyle}><span style={subtitleStyle}>Date</span>: </p>
                        <p style={subtextStyle}><span style={subtitleStyle}>Pages</span>: </p>
                    </div>
                </div>
            </div>
            );
    }
}

export default Profile