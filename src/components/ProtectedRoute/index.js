import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === null ) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;