import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity } from 'react-native';
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
            // <View styles={styles.viewStyle}>
                
            //     <View style={styles.container}>
            //         <View style={styles.userContainer}>
            //             <Image source={require('../assets/user_image_default.png')} style={styles.imageStyle} />
            //             <View style={styles.userInfo}>
            //                 <Text style={{marginBottom: 5}}>Name: {this.state.name}</Text>
            //                 <Text>Email: {this.state.email} </Text>
            //                 <Text>Phone: {this.state.phone}</Text>
            //                 <Text style= {{}} >Zipcode: {this.state.zipcode}</Text>
            //                 <Text>Description: {this.state.description}</Text>
            //             </View>
            //         </View>
            //         <Button 
            //          title="Edit" 
            //          type="solid"
            //          onPress={ () => this.props.navigation.navigate('user_form') } 
            //          backgroundColor="rgba(0,0,0,0)"
            //          color="rgba(0,122,255,1)"
            //         />

            //     </View>
                
            //     <View style={styles.petContainer}>
                    
            //     </View>

                
            // </View>

            <View styles={styles.viewStyle}>

            <View style={styles.userContainer}>
                <View style={styles.userInfo}>
                    <Image source={require('../assets/user_image_default.png')} style={styles.imageStyle} />
                    <Text style={styles.nameStyle}>{this.state.name}</Text>
                    <Text style={styles.descriptionStyle}>{this.state.description}</Text>
                </View>
            </View>


            <TouchableOpacity>
            <Text> Add pet </Text>
            <Image source={require('../assets/icon.png')} style={styles.insertImageStyle} onPress={this.handleNewPet}/>
            </TouchableOpacity>
            </View>
        )
    }
}


const styles = {
    
    viewStyle: {
        flex: 1,

    },
    imageStyle: {
        height: 100,
        width: 100,
        marginBottom: 10,
        marginTop : 5,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
    },
    userContainer: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    nameStyle: {
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    descriptionStyle: {
      fontSize:14,
      color:"#FFFFFF",
      fontWeight:'600',
      textAlign: 'center',
      width:200,

    },
    userInfo: {
        alignItems: 'center',
    },
    petContainer: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 2,
      marginTop:5,
      flexDirection: 'row',
    },



    petImageStyle:{
      height: 80,
      width: 80,
      marginBottom: 10,
      marginTop : 10,
      marginLeft : 10,
      borderWidth: 4,
      borderColor: "black",


    },
    petName:{
      fontSize:20,
      marginTop: 25,
      color: 'black',
      position: 'relative'
    },
    petDescription:{
      fontSize:12,
      marginTop: 55,
      marginLeft: -55,
      color: 'black'
    },
    insertImageStyle: {
      height: 50,
      width: 50,
      marginBottom: 10,
      marginTop : 5,
      marginLeft: 150,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "black",

    }

}

function mapStateToProps (state) {
    return { user_info: state.user_info };
}

export default connect(mapStateToProps, actions)(UserScreen);