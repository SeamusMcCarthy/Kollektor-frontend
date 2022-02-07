import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Auth from "./pages/Auth";
import CategoryEntries from "./pages/CategoryEntries";
import AuthContext from "./shared/contexts/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { token, login, logout, userId } = useAuth();
  const theme = createTheme();
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
        <ThemeProvider theme={theme}>
          <SiteHeader />
          <main>
            <Switch>
              <Route path="/" exact>
                <Categories />
              </Route>
              <Route exact path="/home" component={Categories} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/auth" component={Auth} />

              <Route path="/category/:catId" component={CategoryEntries} />

              <Redirect to="/" />
            </Switch>
          </main>
        </ThemeProvider>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
