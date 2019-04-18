import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView, Permissions, Location, Marker } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';


import RoundButton from '../components/round_button';

import * as actions from '../actions';

class MapScreen extends Component {

    state = {
        mapLoaded: false,
        region: { 
             longitude: 0, //-80.3733,
             latitude: 0, // 25.7574,
             latitudeDelta: 1.00,
             latitudeDelta: 0.09000004144488472
        },
        location: null,
        SEED_MARKERS: [
            {
                title: 'Dog Whisperer',
                description: 'Silver Trail Dog Park',
                coordinate: {
                    longitude: -80.23996982839704,
                    latitude: 26.085947838071064
                }
           
            },
            {
                title: 'Doggy Dog World',
                description: 'Hollywood Beach Dog Park',
                coordinate: {
                    longitude: -80.13696982839704,
                    latitude: 26.385947838071064
                }
            },
            {
                title: 'Hipoallergenical',
                description: 'FIU Dog Park',
                coordinate: {
                    longitude: -80.1796982839704,
                    latitude: 26.186947838071064
                }
            },
            {
                title: 'Super Puppies',
                description: 'Miami Dade Dog Park',
                coordinate: {
                    longitude: -80.33796982839704,
                    latitude: 25.984947838071064
                }
            },
        ]
    }

    _getLocationAsync = async () => {
       
        let location = await Location.getCurrentPositionAsync({});
        console.log("User Location: ");
        console.log(location)
        this.setState({ location });

    }

    async componentDidMount() {

        this.index = 0;
       
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
        this.props.fetchPuppies(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    onHeartButtonPress = () => {
        console.log("Matchmaker Button Pressed!");
        this.props.fetchPuppies(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });    }

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
        if(!this.state.location){
            return (<View />)
        }
        return (
            <View style={{ flex: 1 }}>
                <MapView 
                initialRegion={{
                    latitude: this.state.location.coords.latitude,
                    longitude: this.state.location.coords.longitude,
                    latitudeDelta: 1.0,
                    longitudeDelta: 0.05
                    

                }}
                style={{ flex: 1 }} 
                onRegionChangeComplete={this.onRegionChangeComplete}
                >
                {
                    this.state.SEED_MARKERS.map((marker, index) => {
                        return(
                            <MapView.Marker 
                                key={index}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                                image={require('../assets/paw2.png')}
                            />  
                        )
                    })
                }
                
                </MapView>
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
                    {/* <RoundButton style={styles.pet_button} icon="paw" color="brown"/>  */}
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