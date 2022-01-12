import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import SiteHeader from './components/SiteHeader';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';


function App() {

  const theme = createTheme();
  return (
  <Router>
    <ThemeProvider theme={theme}>
    <SiteHeader />
    <main>
      <Switch>
        <Route path="/" exact>
          <LandingPage />  
        </Route>
        <Route exact path="/home" component={LandingPage} />
        
        <Route path="/category/:id" component={CategoryPage} />
        
        <Redirect to="/" />
      </Switch>
    </main>
    </ThemeProvider>
  </Router>)
  ;
}

export default App;
