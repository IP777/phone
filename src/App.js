import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import PhonePage from "./pages/PhonePage/PhonePage";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

export default function App() {
	return (
		<Switch>
			<Route exact path="/login" component={LoginPage} />
			<PrivateRoute path="/">
				<Route path="/" component={PhonePage} />
			</PrivateRoute>

			<Redirect to="/" />
		</Switch>
	);
}
