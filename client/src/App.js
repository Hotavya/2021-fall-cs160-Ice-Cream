import React, { useEffect, useState } from 'react';
import './app.css';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import NavBar from './components/navbar/navbar';
import Home from './pages/HomePage/HomePage';
import JobBoard from './pages/jobBoard/jobBoard';
import JobBoardList from './pages/jobBoardList/jobBoards';
import Profile from './pages/myAccount/myAccount';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import JobApplication from './pages/JobApplication/JobApplication';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    setIsLoggedIn(Cookies.get('token') != null);
    console.log(isLoggedIn);
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
          {isLoggedIn ? <JobBoardList /> : <Home />}
        </Route>
        <Route exact path="/jobboard/:id" component={JobBoard} />

        <Route exact path="/profile">
          {isLoggedIn ? <Profile /> : <Home />}
        </Route>
      </Router>
    </main>
  );
}

export default App;
