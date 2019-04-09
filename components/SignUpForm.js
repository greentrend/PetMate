import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import * as actions from '../actions';
import { connect } from 'react-redux';

import axios from 'axios'; // used to make network request to server endpoint


const ROOT_URL = 'https://us-central1-petmatedb.cloudfunctions.net';


class SignUpForm extends Component {

    state = { phone: '', error: '' };


    handleSubmit = async () => {
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

        } catch(err){
            console.log(err);
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
                <View style={{ flexDirection: 'row',justifyContent: 'center', margin: 30 }}>
                    <Text style={{ color: 'red'}}>{this.state.error}</Text>
                </View>
                <View style={{ flexDirection: 'row',justifyContent: 'center', margin: 30 }}>
                    <Text style={{ color: 'black'}}>{this.state.phone}</Text>
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


export default connect(mapStateToProps, actions)(SignUpForm);