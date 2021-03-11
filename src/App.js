import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import PhonePage from "./pages/PhonePage/PhonePage";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
// import GuestRout from "./component/GuestRoute/GuestRout";

export default function App() {
	return (
		<Switch>
			{/* <GuestRout path="/login"> */}
			<Route exact path="/login" component={LoginPage} />
			{/* </GuestRout> */}
			<PrivateRoute path="/">
				<Route path="/" component={PhonePage} />
			</PrivateRoute>

			<Redirect to="/" />
		</Switch>
	);
}
