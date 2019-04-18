import React, { Component } from 'react';
import { Alert,View, Text, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Button, ListItem  } from 'react-native-elements';

class UserScreen extends Component {

constructor(props){
  super(props)
  this.state = {show : false};
  this.handleNewPet = this.handleNewPet.bind(this)
  this.handleRemovePet = this.handleRemovePet.bind(this)
}
handleNewPet = () =>{
  const { show } = this.state;
  this.setState( {show : true})
  this.props.navigation.navigate('PetForm');
  console.log("USER PROFILE BUTTON PRESSED!")
}
handleRemovePet = () =>{
  const { show } = this.state;
  this.setState( {show : !show})
  console.log("USER PROFILE BUT PRESSED!")
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

                <View style={styles.userContainer}>
                    <View style={styles.userInfo}>
                        <Image source={require('../assets/user_image_default.png')} style={styles.imageStyle} />
                        <Text style={styles.nameStyle}>JOHN DOE</Text>
                        <Text style={styles.descriptionStyle}>I am a computer scientist who really likes pets please tell me where to meet</Text>
                    </View>
                </View>
                 {this.state.show && <Box />}
          <View style = {styles.buttons}>
              <View style={styles.buttonView}>
               <TouchableOpacity onPress={this.handleNewPet}>
               <Text style = {styles.buttonAdd}> Add new pet </Text>
               </TouchableOpacity>
              </View>
              <View style={styles.buttonRemView}>
               <TouchableOpacity onPress={this.handleRemovePet}>
               <Text style = {styles.buttonRem}> Remove pet </Text>
               </TouchableOpacity>
              </View>
            </View>

            </View>
        )
    }
}
class Box extends Component {
  render(){
    return (
      <View style={styles.petContainer}>
            <Image source={require('../assets/dog-face.png')} style={styles.petImageStyle} />
            <Text style = {styles.petName}> Doggy</Text>
            <Text style = {styles.petDescription}>This is my doggy</Text>

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
        backgroundColor: "white"
    },
    userContainer: {
        backgroundColor: "#10324A",
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
    buttons:{
      flexDirection: 'row'
    },
    buttonView:{
        marginTop: 10,
        marginLeft: 50,
        width: 110,
        height: 30,
        backgroundColor: '#10324A',
        borderRadius:10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1,
        elevation: 6,
        shadowRadius: 50 ,
        shadowOffset : { width: 1, height: 13},
        flexDirection: 'row',

    },

    buttonAdd:{
      fontSize:18,
      color:"#FFFFFF",
      fontWeight:'600',

    },
    buttonRemView:{
        marginTop: 10,
        marginLeft: 50,
        width: 120,
        height: 30,
        backgroundColor: '#10324A',
        borderRadius:10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1,
        elevation: 6,
        shadowRadius: 50 ,
        shadowOffset : { width: 1, height: 13},
        flexDirection: 'row',

    },
    buttonRem:{
      marginLeft: 10,
      fontSize:18,
      color:"#FFFFFF",
      fontWeight:'600',

    },
    form:{
      borderColor:'black',
      marginLeft: 140,
      marginTop:5,
      width:25,
      height:25,
      borderRadius:50,
      borderWidth:1
    },
    buttonForm:{

      fontSize: 20,

    }


}

export default connect(null)(UserScreen);
