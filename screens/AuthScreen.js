import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Input, Button, Icon } from 'react-native-elements';

import axios from 'axios'; // used to make network request to server endpoint
const ROOT_URL = 'https://us-central1-petmatedb.cloudfunctions.net';


//import SignUpForm from '../components/SignUpForm';
//import SignInForm from '../components/SignInForm';
import * as actions from '../actions';

class AuthScreen extends Component {

    state = { phone: '', error: '', code: '', token: ''};

    async componentDidMount() {
       // this.props.customLogin();
        let token = await AsyncStorage.getItem('custom_token');

        this.setState({ token: token })

        this.onAuthComplete(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if(props.token) {
            this.props.navigation.navigate('map')
        }
   }

    

    handleSignInSubmit = async () => {

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

        //IF using redux, we could put the whole try/catch block into an action creator.

        let token = await AsyncStorage.getItem('custom_token');
        if (token) {
            // Dispatch an action saying FB login is done
            firebase.auth().signInWithCustomToken(token);
            this.props.navigation.navigate('map')

            
        } else {
            try{
                console.log("Attempting to Sign in with provided Code... ")
    
                const { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
                    phone: this.state.phone, code: this.state.code
                });
            
                console.log("Verifying user.... Token: ")
                console.log(data)
    
                // handling authentication with JWT
                firebase.auth().signInWithCustomToken(data.token);
                
                await AsyncStorage.setItem('custom_token', data.token);

                if(data.token) {
                    this.props.navigation.navigate('user_form')
                }
    
            }catch(err){
                console.log('Sign in ERROR: ' + err)
            }
        }

        
    }

    handleSignUpSubmit = async () => {

     let token = await AsyncStorage.getItem('custom_token');
  //  let token = await AsyncStorage.removeItem('custom_token');

    if (token) {
        // Dispatch an action saying FB login is done
        firebase.auth().signInWithCustomToken(token);
        this.props.navigation.navigate('map')
        
    } else {
        console.log("this.state.phone");
        console.log(this.state.phone)
        // [await] is waiting for the first promise to get resolved before the next line is handled. 
        try{
            //using await and async allows you to use the variable right after, instead of chaining the .then 
            console.log("Creating User!")
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
            console.log("Requesting one Time password...")
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
            console.log("Password Requested!")

            console.log("Saving phone to AsyncStorage")
            await AsyncStorage.setItem('phone', this.state.phone);
    
        } catch(err){
            console.log(err);
        } 
        
    }

   
} 

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}> 
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
                        <View style={{ flexDirection: 'row',justifyContent: 'center', margin: 30 }}>
                            <Text style={{ color: 'red'}}>{this.state.error}</Text>
                        </View>
                        <View style={{ flexDirection: 'row',justifyContent: 'center', margin: 30 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold'}}>{this.state.phone}</Text>
                        </View>
                            <Input 
                                leftIconContainerStyle={{ marginRight: 10 }}
                                label="Enter Phone number"
                                onChangeText={(phone) => this.setState({ phone })}
                                value={this.state.phone}
                                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                                placeholder="555-555-5555"
                            />
                        </View>
                        <Button 
                            onPress={this.handleSignUpSubmit} 
                            title="Submit" 
                            type="outline"
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}> 
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
                            onPress={this.handleSignInSubmit} 
                            title="Submit" 
                            type="outline"
                        />
                    </View> 
                </View>
            </View>
        )
    }
}

const styles = {
    mainView: {

    }
}

function mapStateToProps({ auth}) {
    return {token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen);