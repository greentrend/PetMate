import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

class UserScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'User Profile', 
            headerRight: (
                <Button 
                title="Map" 
                type="clear"
                onPress={ () => navigation.navigate('map') } 
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


    render() {
        return (
            <View styles={styles.viewStyle}>
                <View style={styles.userContainer}>
                    <Image source={require('../assets/user_image_default.png')} style={styles.imageStyle} />
                    <View style={styles.userInfo}>
                        <Text style={{marginBottom: 5}}>JOHN DOE</Text>
                        <Text>I am a pet lover that enjoys mating different breeds. Please contact me at 954-751-1234 and lets met our pets!</Text>
                    </View>
                    
                </View>
                <View style={styles.petContainer}>
                    
                </View>
            </View>
        )
    }
}

const styles = {
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
    },
    imageStyle: {
        height: 100,
        width: 100,
        marginLeft: 15,
        marginBottom: 10
    },
    userContainer: {
        flexDirection: 'row',
        marginTop: 40,
        borderBottomWidth: 1,
        
    },
    userInfo: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 5
    },
    petContainer: {
             
    }

}

export default connect(null)(UserScreen);