import React from 'react';
import './App.css';
import {Services} from './components/Services';
import {Service} from './components/Service';
import {Loading} from './components/Loading';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"; 
import {useSelector} from'react-redux';
function App() {
  const state =  useSelector(state => state);
  const isLoading = state.service.isLoading || state.services.isLoading;
  return (
    <Router>
      { (isLoading) && <Loading isLoading />}
      <Switch>
        <Route path="/services/:id" exact component={Service} />
        <Route path="/services" component={Services} />
        <Route path="/" exact component={ () => <Redirect to={`/services`} /> } />
      </Switch>
    </Router>
  );
}

export default App;