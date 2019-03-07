import React, { Component } from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import axios from 'axios';

import * as actions from '../actions';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class DeckScreen extends Component {

    renderCard(job) {
        const initialRegion = { 
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }    

        return (
            <Card title={job.title}>
                <View style={{ height: 300 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{flex:1}}
                        cacheEnabled={ Platform.OS === 'android' ? true : false }
                        initialRegion={initialRegion}
                    >

                    </MapView>
                </View>
                
                <View style={styles.detailWrapper}>
                    {/* <Text>{job.company.location}</Text> */}
                    <Text>{job.company.name}</Text>
                    <Text>{job.post_date.substr(0,10)}</Text>
                </View>
                <Text>
                    {/* {job.description.replace(/<b>/g,'').replace(/<\/b/g,'')} */}
                    {job.perks}
                </Text>
            </Card>
        );
    }

    

    renderNoMoreCards = () => {
        return(
            <Card title="No more jobs" style={{ flex: 1, height: 300, position: 'relative', marginTop: 20}}>
                <Button 
                    title="Back to Map"
                    large
                    icon={{ name: 'my-location'}}
                    backgroundColor="#03A9F4"
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }

    render() {
        return (
            <View style={{ margintop: 15, marginBottom: 15, width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}> 
                <Swipe 
                    style={{margintop: 10 }}
                    data={this.props.jobs.listings.listing}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp="id"
                />
            </View>
        )
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}



function mapStateToProps({ jobs }) {
  //  console.log("Jobs: ")
 //   console.log(jobs)
  //  console.log(jobs.listings)
    // const { listings } = jobs;
    // const { listing }  = listings;
    
    return { jobs: jobs }
}

export default connect(mapStateToProps, actions)(DeckScreen);