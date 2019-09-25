import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './src/store/index';



import Navigator from './src/navigation/index';



const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
