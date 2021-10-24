import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import Earnings from './components/pages/Earnings';
import Expenses from './components/pages/Expenses';
import { useState } from 'react/cjs/react.development';
import UserContext from './contexts/UserContext';
import { useEffect } from 'react';

export default function App() {
	
	const [userData, setUserData] = useState(null);
	const [user, setUser] = useState(userData);

	useEffect(() => {
		setUserData(JSON.parse(localStorage.getItem('@user')))
	}, []);

	return (
		<UserContext.Provider value={{ user, userData }}>
			<BrowserRouter>
				<Switch>
					<Route path='/' exact>
						<Login setUser={setUser}/>
					</Route>
					<Route path='/sign-up' exact>
						<SignUp />
					</Route>
					<Route path='/home' exact>
						<Home setUser={setUser}/>
					</Route>
					<Route path='/new-earning' exact>
						<Earnings />
					</Route>
					<Route path='/new-expense' exact>
						<Expenses />
					</Route>
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>
	);
}
