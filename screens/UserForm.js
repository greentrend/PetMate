import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking, AsyncStorage } from 'react-native';
import { Button, Card, Icon, Input, } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import axios from 'axios'; // used to make network request to server endpoint

const ROOT_URL = 'https://us-central1-petmatedb.cloudfunctions.net';


class UserForm extends Component {

    state = { phone: '', name: '', email: '', zipcode: '', description: ''};

    handleSubmit =  async () => {
        console.log("this.state:")
        console.log(this.state)
        // save user info to firebase

        let phone = await AsyncStorage.getItem('phone');

        console.log("phone: ");
        console.log(phone)

        const { data } = await axios.post(`${ROOT_URL}/updateUserInfo` , {
            phone: phone, name: this.state.name, email: this.state.email, zipcode: this.state.zipcode, description: this.state.description
        });

        console.log(data)

        // redirect user back to map
        this.props.navigation.navigate('map');
    }


    render() {
        return (
            <View style={styles.formWrapper}>
                <View style={styles.tileContainer}>
                  <Text style={styles.title}>User Profile </Text>
                </View>
                <Input 
                    leftIconContainerStyle={{ marginRight: 10 }}
                    label="Name"
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    placeholder="John Doe"
                />
                <Input 
                    leftIconContainerStyle={{ marginRight: 10 }}
                    label="email"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    leftIcon={{ type: 'font-awesome', name: 'at' }}
                    placeholder="JohnDoe@gmail.com"
                />
                <Input 
                    leftIconContainerStyle={{ marginRight: 10 }}
                    label="zipcode"
                    onChangeText={(zipcode) => this.setState({ zipcode })}
                    value={this.state.zipcode}
                    leftIcon={{ type: 'font-awesome', name: 'map-pin' }}
                    placeholder="33101"
                />
                <Input 
                    leftIconContainerStyle={{ marginRight: 10 }}
                    label="Description"
                    onChangeText={(description) => this.setState({ description })}
                    value={this.state.description}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    placeholder="Pet Breeder"
                />
                <Button 
                     title="Enter" 
                     type="solid"
                     onPress={ () => this.handleSubmit() } 
                     backgroundColor="rgba(0,0,0,0)"
                     color="rgba(0,122,255,1)"
                    />
            </ View>
        )
    }
}

function mapStateToProps (state) {
    return { likedJobs: state.likedJobs };
}

const styles = {
    tileContainer: {
        alignItems: 'center'
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',

    },
    formWrapper: {
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderColor: "#d6d7da",
        borderWidth: 0.5,
        borderRadius: 4
    }
}
export default connect(mapStateToProps)(UserForm);