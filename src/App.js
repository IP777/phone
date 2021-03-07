import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import PhonePage from "./pages/PhonePage/PhonePage";

export default function App() {
	return (
		<Switch>
			<Route exact path="/" component={LoginPage} />
			<Route path="/phone" component={PhonePage} />
			<Redirect to="/" />
		</Switch>
	);
}
