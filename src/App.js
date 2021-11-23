/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';
import {
  BrowserRouter, Switch, Route, useHistory,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import Earnings from './components/pages/Earnings';
import Expenses from './components/pages/Expenses';
import UserContext from './contexts/UserContext';

export default function App() {
  const [user, setUser] = useState('');
  const history = useHistory();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('@user')));
    if (user === undefined) {
      history.push('/');
    }
    // eslint-disable-next-line
	}, []);

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login setUser={setUser} />
          </Route>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          <Route path="/home" exact>
            <Home setUser={setUser} />
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
