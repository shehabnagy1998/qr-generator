import React from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>

        <Route path="/" component={Home} />

      </Switch>
    </React.Fragment>
  );
}

export default App;
