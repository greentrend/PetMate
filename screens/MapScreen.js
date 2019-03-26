import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView, Permissions } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import RoundButton from '../components/round_button';

import * as actions from '../actions';

class MapScreen extends Component {

    state = {
        mapLoaded: false,
        region: { 
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    async componentDidMount() {
       
        await Permissions.askAsync(Permissions.LOCATION);
        
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
                <View  style={styles.buttonContainer} >
                    <RoundButton style={styles.heart_button} icon="heart" color="red" />
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
    }

}

export default connect(null, actions)(MapScreen);