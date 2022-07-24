// Dependencies
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Containers
import AppContainer from './containers/App';

// Redux Store
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContainer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
