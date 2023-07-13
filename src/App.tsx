import { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Layout/Navbar';
import Profile from './Pages/Profile';
import Account from './Pages/Account';
import Home from './Pages/Home';
import Asset from './Pages/Asset';
import TradeItemList from './Pages/Admin/TradeItemList';
import Admin from './Pages/Admin';
import ConfirmationDialog from './components/ConfirmationDialog';
import { Validate } from './Pages/Validate';

import client from './graphql';
import ItemList from './Pages/ItemList';
import UpdateShipInfo from './Pages/ItemList/UpdateShipInfo';
import Collect from './Pages/Collect';
import Buy from './Pages/Buy';
import PageNotFound from './Pages/PageNotFound';
import InitialLoading from './components/Loading/InitialLoading';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}

function App() {
  const [darkMode, toggleDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleChangeTheme = () => {
    document.body.style.backgroundColor = darkMode ? '#e6e6e6' : '#121112';
    toggleDarkMode(!darkMode);
  };

  // learn more about themes https://material-ui.com/customization/theming/
  const palletType = darkMode ? 'dark' : 'light';

  const currentTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: palletType,
        },
      }),
    [palletType],
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <InitialLoading />;
  } else
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={currentTheme}>
          <SnackbarProvider>
            <Router>
              <Navbar changeTheme={handleChangeTheme}>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/market">
                    <Buy />
                  </Route>
                  <Route exact path="/collect">
                    <Collect />
                  </Route>
                  <Route exact path="/lists/:databaseId">
                    <ItemList />
                  </Route>
                  <Route exact path="/list-shipinfo">
                    <UpdateShipInfo />
                  </Route>
                  <Route exact path="/assets/:databaseId">
                    <Asset />
                  </Route>
                  <Route exact path="/user/:userId">
                    <Profile />
                  </Route>
                  <Route exact path="/user-setting">
                    <Account />
                  </Route>
                  <Route exact path="/trade">
                    <Admin />
                  </Route>
                  <Route exact path="/trade/:databaseId">
                    <TradeItemList />
                  </Route>
                  <Route exact path="/validate/:id">
                    <Validate />
                  </Route>
                  <Route exact path="*">
                    <PageNotFound />
                  </Route>
                </Switch>
              </Navbar>
            </Router>
          </SnackbarProvider>
          <ConfirmationDialog />
        </ThemeProvider>
      </ApolloProvider>
    );
}

export default App;
