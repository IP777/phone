import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	isUriInSelector,
	isLoggedInSelector,
} from "../../redux/reducer/session";

function PrivateRoute({ children, ...restProps }) {
	const isLoggedIn = useSelector(isLoggedInSelector);
	const isLogginedUser = useSelector(isUriInSelector);

	return (
		<Route
			{...restProps}
			render={() =>
				isLoggedIn && isLogginedUser ? (
					children
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
}

export default PrivateRoute;
