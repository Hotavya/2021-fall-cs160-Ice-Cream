import React from 'react';
import './app.css';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import NavBar from './components/navbar/navbar';
import Home from './pages/jobBoard/jobBoard';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <main>
      <Router>
        <NavBar />

        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route></Route>
      </Router>
    </main>
  );
}

export default App;
