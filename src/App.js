import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import Earnings from './components/pages/Earnings';
import Expenses from './components/pages/Expenses';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact>
					<Login />
				</Route>
				<Route path='/signup' exact>
					<SignUp />
				</Route>
				<Route path='/home' exact>
					<Home />
				</Route>
				<Route path='/earnings' exact>
					<Earnings />
				</Route>
				<Route path='/expenses' exact>
					<Expenses />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
