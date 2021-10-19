import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact>
					<Login />
				</Route>
				<Route path='/signup' exact>
					<Register />
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
