import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Expo, { MapView, Permissions, Location } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';


import RoundButton from '../components/round_button';

import * as actions from '../actions';

class MapScreen extends Component {

    state = {
        mapLoaded: false,
        region: { 
            longitude: -80.3733,
            latitude: 25.7574,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    _getLocationAsync = async () => {
       
        let location = await Location.getCurrentPositionAsync({});
        console.log("User Location: ");
        console.log(location)
    }

    async componentDidMount() {
       
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted'){
            console.error('Location Permission not granted');
            return;
        } else {
            console.log("Location Permission granted :)")
        }
       
        this._getLocationAsync();

       this.setState({ mapLoaded: true })
    }

    onRegionChangeComplete = (region) => {
        console.log("Region change...")
        console.log(region)
        this.setState({ region }); 
    }

    onButtonPress = () => {
        console.log("======= THIS.STATE.REGION: ")
        console.log(this.state.region)
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    onHeartButtonPress = () => {
        console.log("Matchmaker Button Pressed!");
        this.props.navigation.navigate('deck')
    }

    onUserButtonPress = () => {
        console.log("USER PROFILE BUTTON PRESSED!")
        this.props.navigation.navigate('user_profile');
    }

    render() { 
        if(!this.state.mapLoaded){
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <MapView 
                region={ this.state.region }
                style={{ flex: 1 }} 
                onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.user_container}>
                  <RoundButton 
                  style={styles.user_profile_button} 
                  icon="user-circle-o" 
                  type="FontAwesome" 
                  color="black" 
                  onPress={this.onUserButtonPress}/>
                </View>
                <View  style={styles.buttonContainer} >
                    <RoundButton style={styles.heart_button} icon="heart" color="red" onPress={this.onHeartButtonPress}/>
                    {/* <Button 
                        large
                        type="outline"
                        title="Search This Area"
                        icon={{ name: 'search' }}
                        onPress={this.onButtonPress}
                    /> */}
                    <RoundButton style={styles.pet_button} icon="paw" color="brown"/>
                </View>
            </View>
        )
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute', //change to absolute to make it clear , Relative to show
        // marginLeft: 15,
        // marginBottom: 15,
      //  flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        left: 0,
        bottom: 0,
        right: 0,
        margin: 15,
         
        
    },
    heart_button: {
        alignContent: 'flex-start',
        // borderWidth: 1,
        // padding: 25,
        // borderColor: 'black'
    }, 
    pet_button: {
        alignContent: 'flex-end'
    },
    user_profile_button: {
        top: 0,
        left: 0,
    },
    user_container: {
        position: 'absolute', //change to absolute to make it clear , Relative to show
        alignItems: 'flex-end',
        left: 0,
        top: 0,
        margin: 10,
    }

}

export default connect(null, actions)(MapScreen);