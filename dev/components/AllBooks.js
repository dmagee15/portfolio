import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';

class AllBooks extends React.Component{
    constructor(props) {
    super(props);
    
    this.state = {
            searchInput: '',
            myBooksArray: [],
            passwordInput: '',
            emailInput: '',
            showInfoBook: null,
            searchStatus: false
            };
    
    }
    
    componentWillMount = () => {
        fetch('/getallbooksdata', {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include'
        })
        .then(function(data) {
            return data.json();
        }).then((j) =>{
            var myBooksArray = j.slice();
            this.setState({myBooksArray});
        });
    };
    
    searchAllBooks = () => {
        
        fetch('/searchallbooks', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"searchInput":this.state.searchInput,
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            var myBooksArray = j.slice();
            this.setState({myBooksArray: myBooksArray,
                searchInput: '',
                searchStatus: true
            });


        });

    }
    cancelSearch = () => {
        fetch('/getallbooksdata', {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
        credentials: 'include'
        })
        .then(function(data) {
            return data.json();
        }).then((j) =>{
            var myBooksArray = j.slice();
            this.setState({myBooksArray: myBooksArray,
                searchStatus: false
            });
        });
    }
    requestBook = (id) => {
        fetch('/requestbook', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify({"id":id,
        })
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            var myBooksArray = j.slice();
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
        this.setState({showInfoBook: book});
    }
    closeInfoWindow = () => {
        this.setState({showInfoBook: null});
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
		    fontFamily: 'Tahoma',
		    fontWeight: 900,
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
		   <AllBookAdded key={index} store={this.props.store} book={book} requestBook={this.requestBook} showInfoWindow={this.showInfoWindow}/>
		);
		var yourTradeRequestsStyle = {
            display: 'inline-block',
            backgroundColor: '#00C351',
            color: 'white',
            height: 32,
            padding:'0px 18px 0px 18px',
            margin:0,
            border: 'none',
            borderRadius: 8,
            margin: '15px 0 0 10px',
            fontFamily: 'Tahoma',
            fontSize: 16,
            fontWeight: 900
		};
		var requestsForYouStyle = {
		    display: 'inline-block',
            backgroundColor: '#FF9A00',
            color: 'white',
            height: 32,
            padding:'0px 18px 0px 18px',
            margin:0,
            border: 'none',
            borderRadius: 8,
            margin: '15px 0 0 10px',
            fontFamily: 'Tahoma',
            fontSize: 16,
            fontWeight: 900
		};
		var cancelSearchStyle = {
		    background: 'white',
		    height: 25,
		    border:'1px solid black',
		    boxShadow:'none',
		    fontSize: 18,
		    fontFamily: 'Tahoma',
		    borderRadius: 2,
		    display: 'inline-block',
		    margin: "15px 0px 0px 10px"
		};

        return (
           <div style={divStyle}>
                <h1 style={hStyle}>All Books</h1>
                <div style={innerDivStyle}>
                    <hr style={hrStyle}/>
                    <input style={searchInputStyle} type="text" value={this.state.searchInput} onChange={this.handleSearchChange}/>
                    <button style={searchButtonStyle} onClick={this.searchAllBooks}>Search Books</button>
                    {
                        this.state.searchStatus &&
                        <button style={cancelSearchStyle} onClick={this.cancelSearch}>Cancel Search</button>
                    }
                    <div style={myBooksStyle}>
                        {booksDisplay}
                    </div>
                    <hr style={hrStyle}/>
                </div>
                <BookInfoBox closeWindow={this.closeInfoWindow} book={this.state.showInfoBook}/>
          </div>
          ); 
        	
   }
}

class AllBookAdded extends React.Component{
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
            backgroundSize: 'cover',
            backgroundImage: "url('"+this.props.book.thumbnail+"')",
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
            padding: 0,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        };
        var buttonDiv = {
            height: 70,
            width: '100%',
            margin: 0,
            padding: 0
        }
        var requestButtonStyle = {
            display: 'inline-block',
            backgroundColor: (this.props.book.tradeRequests.indexOf(this.props.store.user.username)==-1)?'gray':'lightgreen',
            color: 'black',
            height: 40,
            padding:'0px 8px 0px 8px',
            margin:0,
            border: 'none',
            margin: '15px 0 0 10px',
            fontFamily: 'Tahoma',
            fontSize: 18,
            fontWeight: 900
        };
        var blankInfoButtonStyle = {
            display: 'inline-block',
            backgroundColor: 'lightblue',
            color: 'black',
            height: 40,
            padding:'0px 8px 0px 8px',
            border: 'none',
            margin: '15px 30px 30px 5px',
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
        
        if(this.props.book.username==this.props.store.user.username){
            return (
                <div style={divStyle}>
                <div style={thumbnailStyle}>
                    <div style={imgStyle}>
                    </div>
                </div>
                <div style={divContentStyle}>
                    <h3 style={titleStyle}>{this.props.book.title}</h3>
                    <p style={subtextStyle}>Author: <span style={{color:'#5D5D5D'}}>{this.props.book.author}</span></p>
                    <p style={subtextStyle}>Owner: <span style={{color:'#5D5D5D'}}>{this.props.book.username}</span></p>
                    <p style={subtextStyle}>Location: <span style={{color:'#5D5D5D'}}>{this.props.book.city}, {this.props.book.state}</span></p>
                </div>
                <div style={buttonDiv}>
                        <button style={blankInfoButtonStyle} onClick={() => {this.props.showInfoWindow(this.props.book)}}>Book Info</button>
                </div>
            </div>
                );
        }
        else{
        return (
            <div style={divStyle}>
                <div style={thumbnailStyle}>
                    <div style={imgStyle}>
                    </div>
                </div>
                <div style={divContentStyle}>
                    <h3 style={titleStyle}>{this.props.book.title}</h3>
                    <p style={subtextStyle}>Author: <span style={{color:'#5D5D5D'}}>{this.props.book.author}</span></p>
                    <p style={subtextStyle}>Owner: <span style={{color:'#5D5D5D'}}>{this.props.book.username}</span></p>
                    <p style={subtextStyle}>Location: <span style={{color:'#5D5D5D'}}>{this.props.book.city}, {this.props.book.state}</span></p>
                </div>
                <div style={buttonDiv}>
                        <button style={requestButtonStyle} onClick={() => {this.props.requestBook(this.props.book._id)}}>Request</button>
                        <button style={infoButtonStyle} onClick={() => {this.props.showInfoWindow(this.props.book)}}>Book Info</button>
                </div>
            </div>
            );
        }
    }
}

class BookInfoBox extends React.Component{
    constructor(props) {
    super(props);
    }
    
    render(){
    
    if(this.props.book == null){
        return null;
    }
    
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 10
    };

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      width: 650,
      height: 540,
      margin: 0,
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'left',
      zIndex: 100
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
        height:490,
        width: 295,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 0,
        overflowY: 'auto'
    };
    var imgStyle = {
            width: 300,
            height: 480,
            background: "url("+this.props.book.thumbnail+")",
            backgroundSize: 'cover',
            display:'inline-block',
            margin: "10px 12px 10px 12px"
        };
        var titleStyle = {
            display: 'inline-block',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            margin: '5px 0 0 15px',
            padding: '0 0 0 0',
            fontFamily: 'Arial Black',
            fontWeight: 900
        };
        var subtextStyle = {
            color: '#BDBDBD',
            margin: 0,
            padding: '0 0 10px 0',
            fontFamily: "Bookman"
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
        var modalHeaderStyle = {
            display: 'inline-block',
            backgroundColor: '#DFDFDF',
            height: 40,
            minWidth: 650
        }
        
        return (
            <div>
            <div className="backdrop" style={backdropStyle} onClick={this.props.closeWindow}>
                
            </div>
            
            <div className="modal" style={modalStyle}>
                    <div style={modalHeaderStyle}>
                        <h3 style={titleStyle}>{this.props.book.title}</h3>
                    </div>
                    <div style={bookCoverStyle}>
                        <div style={imgStyle}>
                        </div>
                    </div>
                    <div style={contentStyle}>
                        <p style={subtextStyle}>{this.props.book.description}</p>
                        <p style={subtextStyle}><span style={subtitleStyle}>Author</span>: {this.props.book.author}</p>
                        <p style={subtextStyle}><span style={subtitleStyle}>Date</span>: {this.props.book.publishedDate}</p>
                        <p style={subtextStyle}><span style={subtitleStyle}>Pages</span>: {this.props.book.pageCount}</p>
                    </div>
                </div>
            
            </div>
            );
    }
}

export default AllBooks