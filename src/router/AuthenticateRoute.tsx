import { Route, Redirect } from "react-router-dom";
import { isNil, isEmpty } from "ramda";
import { setAuthorize } from "api";

function AuthenticateRoute(props: any) {
  const accessToken = window.localStorage.getItem("access_token");
  setAuthorize(accessToken);
  if (isNil(accessToken) || isEmpty(accessToken)) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
}

export default AuthenticateRoute;
