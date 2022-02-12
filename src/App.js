// import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import SiteHeader from "./components/SiteHeader";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Auth from "./pages/Auth";
import AuthContext from "./shared/contexts/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import CategoryEntries from "./pages/CategoryEntries";
import UserEntries from "./pages/UserEntries";
import AddEntry from "./pages/AddEntry";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Categories />
        </Route>
        <Route path="/category/:catId" exact>
          <CategoryEntries />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/user/:userId" exact>
          <UserEntries />
        </Route>
        <Route path="/new" exact>
          <AddEntry />
        </Route>
        <Route path="/profile" exact>
          <Users />
        </Route>
        <Route path="/entry/:eid" exact>
          <Users />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Categories />
        </Route>
        <Route path="/category/:catId" exact>
          <CategoryEntries />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/user/:userId" exact>
          <UserEntries />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  // const theme = createTheme();
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
