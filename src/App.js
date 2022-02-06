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
import CategoryEntries from "./pages/CategoryEntries";

function App() {
  const theme = createTheme();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SiteHeader />
        <main>
          <Switch>
            <Route path="/" exact>
              <Categories />
            </Route>
            <Route exact path="/home" component={Categories} />

            <Route path="/category/:catId" component={CategoryEntries} />

            <Redirect to="/" />
          </Switch>
        </main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
