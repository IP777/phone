import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "../../redux/reducer/session";

function PrivateRoute({ children, ...restProps }) {
	const isLoggedIn = useSelector(isLoggedInSelector);

	return (
		<Route
			{...restProps}
			render={() => (isLoggedIn ? children : <Redirect to="/login" />)}
		/>
	);
}

export default PrivateRoute;
