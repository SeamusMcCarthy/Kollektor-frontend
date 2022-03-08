import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Categories from "./pages/CategoriesGrid";
import Users from "./pages/Users";
import Auth from "./pages/Auth";
import AuthContext from "./shared/contexts/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import CategoryEntries from "./pages/CategoryEntries";
import UserEntries from "./pages/UserEntries";
import AddEntry from "./pages/AddEntry";
import ViewEntry from "./pages/ViewEntry";
import UpdateEntry from "./pages/UpdateEntry";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={Categories} />
        <Route exact path="/category/:catId" component={CategoryEntries} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user/:userId" component={UserEntries} />
        <Route exact path="/new" component={AddEntry} />
        <Route exact path="/profile/:uid" component={UpdateProfile} />
        <Route exact path="/entry/:eid" component={ViewEntry} />
        <Route exact path="/entries/:eid" component={UpdateEntry} />
        <Redirect from="*" to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Categories} />
        <Route exact path="/category/:catId" component={CategoryEntries} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/user/:userId" component={UserEntries} />
        <Route exact path="/entry/:eid" component={ViewEntry} />
        <Route exact path="/auth" component={Auth} />
        <Redirect from="*" to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
