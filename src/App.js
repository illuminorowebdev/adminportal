import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider as StoreProvider } from 'react-redux';
import configureStore from 'redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { renderRoutes } from 'react-router-config';
import routes from 'routes';
import { ThemeProvider } from '@material-ui/styles';
import themeDefault from 'theme';
import { GlobalLoader } from 'components';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const history = createBrowserHistory();
export const { store, persistor } = configureStore({});

function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <StoreProvider store={store}>
        <PersistGate loading={<GlobalLoader />} persistor={persistor}>
          <Router history={history}>{renderRoutes(routes)}</Router>
          <NotificationContainer />
        </PersistGate>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
