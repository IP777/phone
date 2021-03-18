import LoginPage from "../pages/LoginPage/LoginPage";
import { connect } from "react-redux";
import { loginWithResponse } from "../redux/operations/sessionOperations";

const mapDispatchToProps = {
	loginWithResponse,
};

export default connect(null, mapDispatchToProps)(LoginPage);
