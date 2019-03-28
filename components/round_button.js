import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class RoundButton extends Component {
    render() {
        return(
            <TouchableOpacity
                style={{
                    //borderWidth:1,
                    //borderColor:'rgba(255,255,255.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:70,
                    height:70,
                 //  backgroundColor:'#fff',
                    borderRadius:50,
                    }}
                onPress={this.props.onPress}
                >
                
                <Icon name={this.props.icon} size={50} color={this.props.color} />
            </TouchableOpacity>
        )
    }
}

export default RoundButton;