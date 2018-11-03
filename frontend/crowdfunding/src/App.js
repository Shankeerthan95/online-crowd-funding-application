import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Switch, Route, NavLink } from 'react-router-dom';
import RegForm from './components/RegForm';
import LoginForm from './components/LoginForm';


class App extends Component {
  render() {
    return (<div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component= {Home}/>
          <Route path="/login" component ={LoginForm}/>
          <Route path="/register" component={RegForm}/>
          {/* <Route path="/posts"/> */}
        </Switch>
      </div>
    );
  }
}

export default App;
