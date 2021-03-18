import Phone from "../component/Phone/Phone";
import { connect } from "react-redux";
import { getSession, getToken } from "../redux/reducer/session";
import { loginWithToken } from "../redux/operations/sessionOperations";

const mapStateToProps = (state) => ({
	auth: getSession(state),
});

const mapDispatchToProps = {
	loginWithToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);
