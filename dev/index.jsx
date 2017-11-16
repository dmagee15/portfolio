console.log("Script started");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch, Link, IndexRoute, Redirect} from 'react-router-dom';
import ReactRedux, {connect, Provider} from 'react-redux';
import Redux, {createStore, bindActionCreators} from 'redux';
import Home from "./components/Home.js";
import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import Header from "./components/Header.js";
import Profile from "./components/Profile.js";


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
    
    fetch('/logstatus', {
        method: 'GET',
        credentials: 'include'
        }).then(function(data) {
            return data.json();
        }).then((j) =>{
            console.log(j);
            if(j!=false){
              this.props.loginUser(j);
            }
        });
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
                <Route exact path='/profile' render={(props) => (
                    <Profile store={this.props}/>
                )} />
                <Route exact path='/login' render={(props) => (
                    <Login store={this.props}/>
                )} />
            </div>
            </Router>
          </div>
          ); 
					
   }
      
   
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

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