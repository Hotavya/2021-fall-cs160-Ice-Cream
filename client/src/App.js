import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import NavBar from './components/navbar/navbar';
import Home from './pages/HomePage';
import JobBoard from './pages/jobBoard/jobBoard';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import JobApplication from './pages/JobApplication/JobApplication';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    setIsLoggedIn(Cookies.get('token') != null);
  }, [isLoggedIn]);

  const registerUser = (token) => {
    Cookies.set('token', token);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <main>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} logoutUser={logoutUser} />
        <Route exact path="/signup">
          <Signup saveUserToken={registerUser} />
        </Route>
        <Route exact path="/login">
          <Login saveUserToken={registerUser} />
        </Route>
        <Route exact path="/">
          <Home />
          {/* <JobApplication></JobApplication> */}
        </Route>
        <Route exact path="/jobboard/:id" component={JobBoard} />

        <Route></Route>
      </Router>
    </main>
  );
}

export default App;
