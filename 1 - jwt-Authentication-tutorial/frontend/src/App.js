import React, { useState, useEffect } from 'react';
import { Router, navigate } from "@reach/router";

import Navigation from "./components/Navigation";
import Content from "./components/Content";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Register from "./components/Register";


// we are creating the UseContext Hooks to share our data to every component in the project
export const UserContext = React.createContext([]);


function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logoutCallback = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    // we are clearing the user from context
    setUser({});
    // And then we will Navigate back to start page
    navigate('/'); 
  };

  // The first thing we need to do is to get a new accesstoken if a refreshtoken exist  
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (await fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include', // you must add include to include the cookie
        headers: {
          'Content-Type': 'application/json',
        }
      })).json();
      setUser({
        accesstoken: result.accesstoken,
      });
      setLoading(false);
    } 
    checkRefreshToken();
  }, []);

  if (loading) return <div className="loading-container">Loading ...</div>;


  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="app">
        <Navigation logoutCallback={logoutCallback} />
        <Router id="router">

          <Login path="login" />
          <Register path="register" />
          <Protected path="protected" />
          <Content path="/" />

        </Router>

      </div>
    </UserContext.Provider>
  );
}


export default App;
