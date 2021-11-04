import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import Earnings from './components/pages/Earnings';
import Expenses from './components/pages/Expenses';
import { useEffect, useState } from 'react';
import UserContext from './contexts/UserContext';
import { useHistory } from 'react-router';

export default function App() {
	
	const [user, setUser] = useState('');
	const history = useHistory();

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('@user')));
		if (user === undefined) {
			history.push('/')
		}
		// eslint-disable-next-line
	}, []);

	return (
		<UserContext.Provider value={{ user }}>
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
