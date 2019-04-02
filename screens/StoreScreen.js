import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';


const ROOT_URL = 'api goes here';
const QUERY_PARAMS = {
    // api_key: 'ae14c2e712c6c2cffa632aa9ec8a1386',
    // method: 'aj.jobs.search',
    // format: 'json',
    // perpage: '10',
};

const buildJobsUrl = () => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS });
    return `${JOB_ROOT_URL}${query}`;
};

const Items = [];

export const fetchStoreItems = () => async (dispatch) => {
    try {
        const url = buildJobsUrl();
        console.log("\n ============== URL:" + url + " ==================\n");
        let { data } = await axios.get(url);
        console.log("DATA from STORE: ")
        console.log(data)
      //  dispatch({ type: FETCH_JOBS, payload: data });
     //   console.log(data)
    //    callback();
    } catch (err) {
        console.log(err);
    }
};

class StoreScreen extends Component {

    render() {
        return (
            <View>

            </View>
        )
    }
}



const styles = {
    
}
export default connect(null)(StoreScreen);