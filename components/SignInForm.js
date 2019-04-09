import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import * as actions from '../actions';
import { connect } from 'react-redux';

import axios from 'axios'; // used to make network request to server endpoint
import firebase from 'firebase';


const ROOT_URL = 'https://us-central1-petmatedb.cloudfunctions.net';


class SignInForm extends Component {

    state = { phone: '', error: '', code: ''};

    handleSubmit = async () => {

        console.log("This.state.phone: ")
        console.log(this.state.phone);

        console.log("This.state.code: ")
        console.log(this.state.code)

        console.log("this.state");
        console.log(this.state)

        console.log("this.props");
        console.log(this.props)

        console.log("this.props.token: ")
        console.log(this.props.token)

        console.log("auth")
        console.log(auth);

        console.log("auth.token");
        console.log(auth.token)

        

        //IF using redux, we could put the whole try/catch block into an action creator.
        try{
            console.log("Attempting to Sign in with provided Code... ")

            const { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
                phone: this.state.phone, code: this.state.code
            });
        
            console.log("Verifying user.... Token: ")
            console.log(data)
            this.props.token = 

            // handling authentication with JWT
            firebase.auth().signInWithCustomToken(data.token);

            if(data.token) {
                this.props.navigation.navigate('map')
            }

        }catch(err){
            console.log('Sign in ERROR: ' + err)
        }
    }

    render() {
        return(
            <View style={{ 
                flex: 1,
                justifyContent: 'center'
                }}
            >
                <View 
                    style={{ 
                        marginBottom: 10,
                    }}                     
                >
                    <Input 
                        leftIconContainerStyle={{ marginRight: 10 }}
                        label="Enter Phone number"
                        onChangeText={(phone) => this.setState({ phone })}
                        value={this.state.phone}
                        leftIcon={{ type: 'font-awesome', name: 'phone' }}
                        placeholder="555-555-5555"
                    />
                </View>


                <View 
                    style={{ 
                        marginBottom: 10,
                    }}                     
                >
                    <Input 
                        leftIconContainerStyle={{ marginRight: 10 }}
                        label="Enter Code"
                        onChangeText={(code) => this.setState({ code })}
                        value={this.state.code}
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        placeholder="####"
                    />
                </View>
                <Button 
                    onPress={this.handleSubmit} 
                    title="Submit" 
                    type="outline"
                />
            </View>
        );
    }
}


function mapStateToProps({ auth, phone }) {
    return {token: auth.token, phone: phone }
}


export default connect(mapStateToProps, actions)(SignInForm);