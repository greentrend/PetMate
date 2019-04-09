import React from 'react';
import Expo, { Notifications } from 'expo';
import { StyleSheet, Alert} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store'
import firebase from 'firebase';

import AppNavigation from './navigation/AppNavigation';
//import store from './store';

import registerForNotifications from './services/push_notifications';


class App extends React.Component {

  componentDidMount() {

    const config = {
      apiKey: "AIzaSyC74wOI63ZHIVDa0NcFRrh0Ywq6T65MUe8",
      authDomain: "petmatedb.firebaseapp.com",
      databaseURL: "https://petmatedb.firebaseio.com",
      projectId: "petmatedb",
      storageBucket: "petmatedb.appspot.com",
      messagingSenderId: "161643427168"
    };

    firebase.initializeApp(config);

    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;
      if (origin === 'received' && text){
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    })
  }

  render() {

    const { persistor, store } = configureStore();
    return(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    )

  }
}



const styles = StyleSheet.create ({
  container: {
    flex: 1
  }
})

export default App;