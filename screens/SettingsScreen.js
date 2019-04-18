import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';
import { Button } from 'react-native-elements';

class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    submitAndClear = () => {
        // this.props.writeText(this.state.text)
        this.setState({
          text: ''
        })
      }

    render() {
        return (
            <View>
               
                <View style={styles.Info}>
                    <Text>Tap a message to send or write your own</Text>
                </View>
          
                {/* make it work */}
                <TouchableOpacity onPress={this._onPressButton}> 
                <View style={styles.shortMessages}>
                    <Text>Hi, I would like to meet</Text>
                </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={this._onPressButton}> 
                <View style={styles.shortMessages}>
                    <Text>Hi, would you like to breed your pet?</Text>
                </View>
                </TouchableOpacity>
                
                <View style={styles.customMessages}>
                    <TextInput
                        style={styles.Inputtext}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder='New message...'
                        clearButtonMode='always'
                    />
                    <TouchableOpacity onPress={this.submitAndClear}>
                        <View style={styles.shortMessages}>
                            <Text>Send</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* <Button 
                    title="Reset Liked Jobs"
                    large
                    icon={{ name: 'delete' }}
                    backgroundColor="#f44336"
                    onPress={this.props.clearLikedJobs}
                    style={{ marginTop: 30 }}
                /> */}


            </View>

            
        )
    }
}

const styles = {
    shortMessages: {
        fontStyle: 'italic',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(102, 205, 170, 0.7)',
        borderColor: '#d0e2de',
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        margin: 15,
        borderRadius: 5,
        
    },
    Inputtext: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 20,
        paddingLeft: 5,
        borderRadius: 5,
    },
    Info: {
        paddingTop:20,
        paddingLeft: 15,
        flexDirection: 'row',
    }
}

export default connect(null, {clearLikedJobs})(SettingsScreen);

// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import { connect } from 'react-redux';
// import { clearLikedJobs } from '../actions';
// import { Button } from 'react-native-elements';

// class SettingsScreen extends Component {


//     render() {
//         return (
//             <View>
//                 <Button 
//                     title="Reset Liked Jobs"
//                     large
//                     icon={{ name: 'delete' }}
//                     backgroundColor="#f44336"
//                     onPress={this.props.clearLikedJobs}
//                     style={{ marginTop: 30 }}
//                 />
//             </View>
//         )
//     }
// }

// export default connect(null, {clearLikedJobs})(SettingsScreen);