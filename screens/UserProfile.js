import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as actions from '../actions';

import axios from 'axios'; // used to make network request to server endpoint
const ROOT_URL = 'https://us-central1-petmatedb.cloudfunctions.net';

class UserScreen extends Component {

    state = { phone: '', name: '', email: '', zipcode: '', description: ''};

    async componentDidMount() {
        let phone = await AsyncStorage.getItem('phone');
        console.log("fetchins user info... phone:");
        console.log(phone)
          
        const { data }  = await axios.post(`${ROOT_URL}/getUserInfo`, { phone: phone } );
           
        const user = data.user;

        //const json = await user.json();   
        console.log("User: ")     
        console.log(user);

        this.setState({
            phone: user.phone,
            name: user.name,
            email: user.email,
            zipcode: user.zipcode,
            description: user.description,
        })
    
    }

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
                
                <View style={styles.container}>
                    <View style={styles.userContainer}>
                        <Image source={require('../assets/user_image_default.png')} style={styles.imageStyle} />
                        <View style={styles.userInfo}>
                            <Text style={{marginBottom: 5}}>Name: {this.state.name}</Text>
                            <Text>Email: {this.state.email} </Text>
                            <Text>Phone: {this.state.phone}</Text>
                            <Text style= {{}} >Zipcode: {this.state.zipcode}</Text>
                            <Text>Description: {this.state.description}</Text>
                        </View>
                    </View>
                    <Button 
                     title="Edit" 
                     type="clear"
                     onPress={ () => this.props.navigation.navigate('user_form') } 
                     backgroundColor="rgba(0,0,0,0)"
                     color="rgba(0,122,255,1)"
                    />

                </View>
                
                <View style={styles.petContainer}>
                    
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flexDirection: 'column'
    },
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

function mapStateToProps (state) {
    return { user_info: state.user_info };
}

export default connect(mapStateToProps, actions)(UserScreen);

