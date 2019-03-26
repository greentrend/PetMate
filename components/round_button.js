import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class RoundButton extends Component {
    render() {
        return(
            <TouchableOpacity
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:100,
                    height:100,
                    backgroundColor:'#fff',
                    borderRadius:50,
                    }}
                >
                <Icon name={this.props.icon} size={50} color={this.props.color} />
            </TouchableOpacity>
        )
    }
}

export default RoundButton;