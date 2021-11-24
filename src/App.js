/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Earnings from './pages/Earnings';
import Expenses from './pages/Expenses';
import UserContext from './contexts/UserContext';

export default function App() {
  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/new-earning" exact>
            <Earnings />
          </Route>
          <Route path="/new-expense" exact>
            <Expenses />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
