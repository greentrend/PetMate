import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';



class ReviewScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Review Jobs', 
            headerRight: (
                <Button 
                title="Settings" 
                type="clear"
                onPress={ () => navigation.navigate('settings') } 
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0,122,255,1)"
                />
            ),
            headerStyle: {
                // marginTop: Platform.OS === 'android' ? 24 : 0
            }, 
            
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        };
       
    };

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const { company, title, post_date, url, id} = job;
            const initialRegion = {
                longitude: 0,
                latitude: 0,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }

            return(
                <Card title={title} key={id}>
                    <View style={{ height: 200 }}>
                        <MapView 
                            style={{ flex: 1 }}
                            cacheEnable={Platform.OS === 'android' ? true : false}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company.name}</Text>
                            <Text style={styles.italics}>{post_date.substr(0,10)}</Text>
                        </View>
                        <Button 
                            title="Apply Now!"
                            backgroundColor="03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ ScrollView>
        )
    }
}

function mapStateToProps (state) {
    return { likedJobs: state.likedJobs };
}

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}
export default connect(mapStateToProps)(ReviewScreen);