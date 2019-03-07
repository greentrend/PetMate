import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers, createMigrate } from 'redux-persist';
import { AsyncStorage } from 'react-native'
import reducers from '../reducers';

const migrations = {
    0: (state) => {
        //migration clear out device state
        return {
            ...state,
            device: undefined
        }
    }, 
    1: (state) => {
        //migration to keep only the device state
        return {
            device: state.device
        }
    }
}

const config = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['likedJobs'],
    migrate: createMigrate(migrations, { debug: false })
};

const reducer = persistCombineReducers(config, reducers);
export default function configurationStore(initialState = {}){
    
    const store = createStore (
        reducer,
        initialState,
        applyMiddleware(thunk),
    );
    const persistor = persistStore(store);
    return { persistor, store };
}

// persistStore(store, { storage: AsyncStorage, whiteList: ['likedjobs'] });

// export default store;