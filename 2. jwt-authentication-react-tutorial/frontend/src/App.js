import React, { Component } from 'react';
import Login from "./components/Login";
import Regular from "./components/Regular";
import Special from "./components/Special";
import Home from "./components/Home";
import './App.css';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { isAuthenticated } from "./Repository";


class App extends Component {

  logOut() {
    localStorage.removeItem('x-access-token');
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-default">
            <div className="container-fluid container">
              <div className="navbar-header">
                  <span className="navbar-brand">
                    <Link to="/">DevTips</Link>
                  </span>
              </div>
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/tip/regular">Regular Tips</Link>
                </li>
                <li>
                  {
                    ( isAuthenticated() ) ?
                      <Link to="/tip/special">Special Tips</Link> : ''
                  }
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                  {
                    ( isAuthenticated() ) ?
                    ( <li onClick={this.logOut}>
                      <Link to="/">Log out</Link>
                    </li> ) 
                    :
                    ( <li>
                        <Link to="/login">Log in</Link>
                     </li> )
                  }
              </ul>
            </div>
          </nav>

          <Route exact path="/" component={Home} />
          <Route exact path="/tip/regular" component={Regular} />
          <Route exact path="/tip/special" component={Special} />
          <Route exact path="/login" component={Login} />

        </div>
      </Router>
    )
  }
}


export default App;
